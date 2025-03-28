/*
 * Copyright (C) 2024-present Puter Technologies Inc.
 *
 * This file is part of Puter.
 *
 * Puter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const APIError = require("../../../api/APIError");
const { Context } = require("../../../util/context");

/**
 * Middleware that checks if captcha verification is required
 * This is the "first half" of the captcha verification process
 * It determines if verification is needed but doesn't perform verification
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} [options.strictMode=true] - If true, fails closed on errors (more secure)
 * @returns {Function} Express middleware function
 */
const checkCaptcha = (options = {}) => async (req, res, next) => {
    // Default to strict mode for security
    const strictMode = options.strictMode !== false;
    
    try {
        // Get services from the Context
        const services = Context.get('services');
        
        // Fail closed if services aren't available (in strict mode)
        if (!services) {
            console.log('CAPTCHA DIAGNOSTIC: services not available in Context');
            req.captchaRequired = strictMode;
            return next();
        }
        
        // Get captcha service
        let captchaService;
        try {
            captchaService = services.get('captcha');
            console.log('CAPTCHA DIAGNOSTIC: captchaService available, enabled:', captchaService.enabled);
            
            // If captcha service exists but is explicitly disabled, set captchaRequired to false immediately
            if (captchaService.enabled === false) {
                console.log('CAPTCHA DIAGNOSTIC: captchaService is explicitly disabled, bypassing check');
                req.captchaRequired = false;
                return next();
            }
        } catch (captchaError) {
            console.warn('CAPTCHA DIAGNOSTIC: captchaService not available:', captchaError.message);
            req.captchaRequired = strictMode;
            return next();
        }
        
        // If captcha service doesn't exist or isn't properly initialized, set requirement based on strict mode
        if (!captchaService || typeof captchaService.verifyCaptcha !== 'function') {
            console.error('CAPTCHA DIAGNOSTIC: invalid captcha service');
            req.captchaRequired = strictMode;
            return next();
        }
        
        // Set captcha requirement based on service status
        req.captchaRequired = true;
        next();
    } catch (error) {
        console.error('CAPTCHA DIAGNOSTIC: Error in checkCaptcha:', error);
        req.captchaRequired = strictMode;
        next();
    }
};

/**
 * Middleware that requires captcha verification
 * This is the "second half" of the captcha verification process
 * It uses the result from checkCaptcha to determine if verification is needed
 * 
 * @param {Object} options - Configuration options
 * @param {boolean} [options.strictMode=true] - If true, fails closed on errors (more secure)
 * @returns {Function} Express middleware function
 */
const requireCaptcha = (options = {}) => async (req, res, next) => {
    // Default to strict mode for security
    const strictMode = options.strictMode !== false;
    
    try {
        // Check if captcha is required based on previous middleware
        const captchaRequired = req.captchaRequired !== undefined ? req.captchaRequired : strictMode;
        
        if (!captchaRequired) {
            return next();
        }
        
        // Get services from the Context
        const services = Context.get('services');
        
        // Fail closed if services aren't available (in strict mode)
        if (!services) {
            if (strictMode) {
                return next(APIError.create('internal_error', null, {
                    message: 'Captcha service unavailable',
                    status: 503
                }));
            }
            return next();
        }
        
        let captchaService;
        try {
            captchaService = services.get('captcha');
        } catch (error) {
            console.warn('Captcha verification: required service not available', error);
            if (strictMode) {
                return next(APIError.create('internal_error', null, {
                    message: 'Captcha service unavailable',
                    status: 503
                }));
            }
            return next();
        }

        // Fail closed if captcha service doesn't exist or isn't properly initialized
        if (!captchaService || typeof captchaService.verifyCaptcha !== 'function') {
            return next(APIError.create('internal_error', null, {
                message: 'Captcha service misconfigured',
                status: 500
            }));
        }
        
        // Check for captcha token and answer in request
        const captchaToken = req.body.captchaToken;
        const captchaAnswer = req.body.captchaAnswer;

        if (!captchaToken || !captchaAnswer) {
            return next(APIError.create('captcha_required', null, {
                message: 'Captcha verification required',
                status: 400
            }));
        }
        
        // Verify the captcha
        let isValid;
        try {
            isValid = captchaService.verifyCaptcha(captchaToken, captchaAnswer);
        } catch (verifyError) {
            console.error('Captcha verification: threw an error', verifyError);
            return next(APIError.create('captcha_invalid', null, {
                message: 'Captcha verification failed',
                status: 400
            }));
        }
        
        // Check verification result
        if (!isValid) {
            return next(APIError.create('captcha_invalid', null, {
                message: 'Invalid captcha response',
                status: 400
            }));
        }

        // Captcha verified successfully, continue
        next();
    } catch (error) {
        console.error('Captcha verification: unexpected error', error);
        if (strictMode) {
            return next(APIError.create('internal_error', null, {
                message: 'Captcha verification failed',
                status: 500
            }));
        }
        next();
    }
};

module.exports = {
    checkCaptcha,
    requireCaptcha
}; 