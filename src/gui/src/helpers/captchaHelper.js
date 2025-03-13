/**
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

/**
 * Cache for captcha requirements to avoid repeated API calls
 */
let captchaRequirementsCache = null;

/**
 * Checks if captcha is required for a specific action
 * 
 * This function first checks GUI parameters, then falls back to the /whoarewe endpoint
 * 
 * @param {string} actionType - The type of action (e.g., 'login', 'signup')
 * @returns {Promise<boolean>} - Whether captcha is required for this action
 */
async function isCaptchaRequired(actionType) {
    // Check if we have the info in GUI parameters
    if (window.gui_params?.captchaRequired?.[actionType] !== undefined) {
        console.log(`Captcha requirement for ${actionType} from GUI params: ${window.gui_params.captchaRequired[actionType]}`);
        return window.gui_params.captchaRequired[actionType];
    }

    // If not in GUI params, check the cache
    if (captchaRequirementsCache && captchaRequirementsCache.captchaRequired?.[actionType] !== undefined) {
        console.log(`Captcha requirement for ${actionType} from cache: ${captchaRequirementsCache.captchaRequired[actionType]}`);
        return captchaRequirementsCache.captchaRequired[actionType];
    }

    // If not in cache, fetch from the /whoarewe endpoint
    try {
        const response = await fetch(window.api_origin + '/whoarewe');
        
        if (!response.ok) {
            console.warn(`Failed to get captcha requirements: ${response.status}`);
            return true; // Default to requiring captcha if we can't determine
        }
        
        const data = await response.json();
        
        // Cache the result
        captchaRequirementsCache = data;
        
        console.log(`Captcha requirement for ${actionType} from API: ${data.captchaRequired?.[actionType]}`);
        
        // Return the requirement or default to true if not specified
        return data.captchaRequired?.[actionType] ?? true;
    } catch (error) {
        console.error('Error checking captcha requirements:', error);
        return true; // Default to requiring captcha on error
    }
}

/**
 * Invalidates the captcha requirements cache
 * This is useful when the requirements might have changed
 */
function invalidateCaptchaRequirementsCache() {
    captchaRequirementsCache = null;
}

export { 
    isCaptchaRequired,
    invalidateCaptchaRequirementsCache
}; 