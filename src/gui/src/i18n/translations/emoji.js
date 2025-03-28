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

const emoji = {
    name: "🌍",
    english_name: "Emoji",
    code: "emoji",
    dictionary: {
        access_granted_to: "🔓✅",
        add_existing_account: "➕🔄👤",
        all_fields_required: '📝🔒✅',
        apply: "📋🔄",
        ascending: '🔼',
        auto_arrange: '🔄📂📄',
        background: "🖼️",
        browse: "🔍",
        cancel: '❌',
        center: '🎯',
        change_desktop_background: '🔄🖥️🖼️',
        change_language: "🔄🌐",
        change_password: "🔑🔄",
        change_username: "👤🔄",
        close_all_windows: "❌🔄🖼️🖼️",
        close_all_windows_and_log_out: '❌🔄🖼️🖼️🔚',
        color: '🎨',
        confirm_account_for_free_referral_storage_c2a: '📧🆓👤📂📦🆓',
        confirm_delete_multiple_items: '❓❌🗑️❓',
        confirm_delete_single_item: '❓❌🗑️❓',
        confirm_open_apps_log_out: '❓📦🔄🔚',
        confirm_new_password: "🔑❓🔑",
        contact_us: "📞📧",
        contain: '📦🔍',
        continue: "⏩",
        copy: '📋',
        copy_link: "🔗📋",
        copying: "📋➡️",
        cover: '📚👀',
        create_account: "👤🆕",
        create_free_account: "👤🆓",
        create_shortcut: "📌🔄",
        current_password: "🔑🔍",
        cut: '✂️',
        date_modified: '📅🔄',
        delete: '🗑️',
        delete_permanently: "🗑️🔚",
        deploy_as_app: '🚀📱',
        descending: '🔽',
        desktop_background_fit: "🖥️🖼️",
        dir_published_as_website: `📂📰🌐`,
        disassociate_dir: "📂🔁❌",
        download: '⬇️',
        download_file: '⬇️📄',
        downloading: "⬇️➡️",
        email: "📧",
        email_or_username: "📧👤",
        empty_trash: '🗑️🆓',
        empty_trash_confirmation: `❓🗑️❓`,
        emptying_trash: '🗑️🆓...',
        feedback: "📝💬",
        feedback_c2a: "📝📤",
        feedback_sent_confirmation: "📧👍",
        forgot_pass_c2a: "🔑❓ (╯°□°）╯︵ ┻━┻",
        from: "📩",
        general: "⚙️",
        get_a_copy_of_on_puter: `📩🔄📂`,
        get_copy_link: '🔗🔄',
        hide_all_windows: "🔚🔄🖼️🖼️",
        html_document: '📄🌐',
        image: '🖼️',
        invite_link: "🔗📩",
        item: '📂',
        items_in_trash_cannot_be_renamed: `🗑️🆓❌`,
        jpeg_image: '🖼️',
        keep_in_taskbar: '📌📁',
        loading: '🔄',
        log_in: "👤🔓",
        log_into_another_account_anyway: '👤🔄',
        log_out: '🔚',
        move: '➡️',
        moving_file: "➡️ %%...",
        my_websites: "🌐👤",
        name: '📛',
        name_cannot_be_empty: '📛❌',
        name_cannot_contain_double_period: "📛❌",
        name_cannot_contain_period: "📛❌",
        name_cannot_contain_slash: "📛❌",
        name_must_be_string: "📛❌",
        name_too_long: `📛❌`,
        new: '🆕',
        new_folder: '🆕📂',
        new_password: "🆕🔑",
        new_username: "🆕👤",
        no: '❌',
        no_dir_associated_with_site: '📂❌🌐',
        no_websites_published: "🌐❌",
        ok: '👌',
        open: "📂🔄",
        open_in_new_tab: "📂🔄🆕",
        open_in_new_window: "📂🔄🖼️🆕",
        open_with: "📂🔄🔓",
        password: "🔑",
        password_changed: "🔑✅",
        passwords_do_not_match: '🔑❌🔑',
        paste: '📋➡️',
        paste_into_folder: "📂📋➡️",
        pick_name_for_website: "🌐📛❓:",
        picture: "🖼️",
        powered_by_puter_js: `⚙️🔌🔗`,
        preparing: "🔄🔜",
        preparing_for_upload: "🔄🔜",
        proceed_to_login: '👤🔍',
        properties: "⚙️",
        publish: "📰",
        publish_as_website: '🌐📰',
        plural_suffix: '🅰️',
        recent: "🔙",
        recover_password: "🔑🔄📧",
        refer_friends_c2a: "👤📞📧👤",
        refer_friends_social_media_c2a: `📲👤🆓`,
        refresh: '🔄🔄',
        release_address_confirmation: `❓🆓`,
        remove_from_taskbar:'📌❌📁',
        rename: '🔄📛',
        repeat: '🔂',
        replace: '🔄🔄',
        replace_all: '🔄🔄',
        resend_confirmation_code: "📧🔁",
        restore: "🔄🔙",
        save_account: '👤💾',
        save_account_to_get_copy_link: "🆕👤📋🔗",
        save_account_to_publish: '🆕👤📰',
        save_session: '💾📂',
        save_session_c2a: '🆕👤💾',
        scan_qr_c2a: '📲🔍',
        select: "👉",
        selected: '✅',
        select_color: '🎨👉',
        send: "📤",
        send_password_recovery_email: "📧🔑🔄",
        session_saved: "👤💾🔄",
        set_new_password: "🔑🆕",
        share_to: "🔁➡️",
        show_all_windows: "🔄🆓🖼️🖼️",
        show_hidden: '👁️🔄',
        sign_in_with_puter: "👤🆔",
        sign_up: "👤🆕",
        signing_in: "🔄👤",
        size: '📏',
        skip: '⏩',
        sort_by: '🔢🔄',
        start: '🚀',
        taking_longer_than_usual: '⏳🔄',
        text_document: '📄',
        tos_fineprint: `👤📝📄`,
        trash: '🗑️',
        type: '🔡',
        undo: '↩️',
        unzip: "🔓📂",
        upload: '⬆️',
        upload_here: '⬆️📂',
        username: "👤",
        username_changed: '👤✅',
        versions: "🔄📃",
        yes: '✅',
        yes_release_it: '✅🆓',
        you_have_been_referred_to_puter_by_a_friend: "👤🔁🆓",
        zip: "📂🔒",

		// ***********************************
		// Missing translations
		// ***********************************

    }
};
 
export default emoji;