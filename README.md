jQuery Notification
===

This plugin uses the native Notification object in order to show notifications. In case the browser is outdated and doesn't support them, it fallbacks to [jQuery Gritter](https://github.com/jboesch/Gritter).

Installation
---

Use bower to install the prerequisites, or manually add jQuery (>= 1.8.2) and jQuery Gritter (>= 1.7.4) to your project.

Usage
---
1. Include the jQuery script
2. Include the Gritter CSS and JavaScript files
3. Include the jQuery Notification script

In order to create a new notification, simply add the following code:

    var notification = $.Notification(title, message, options, callbacks);

`notification` is the Notification object in case the native Notification API is being used, the Gritter notification ID otherwise.

Options
---

- `icon` image used as notification's icon. Default `null`.
- `forceGritter` used to force the usage of Gritter instead of the native notification API. Default `false`.
- `dir`* notification's text direction (`auto`, `ltr`, `rtl`). Default `auto`.
- `lang`* notification's language, BCP 47 language tag (shortest 2-3ALPHA ISO 639, es `en`). Default `null`.
- `tag`* the unique identifier of the notification. Default `null`, automatically generated.

__*__ available only for the native Notification API.

**Note**: in order to set the position of the Gritter's notification you have to set it via the style of `#gritter-notice-wrapper`

Callbacks
---

- `onShow` __(Gritter: after_open)__
- `onClose` __(Gritter: after_close)__
- `onClick`*
- `onError`*

__*__ available only for the native Notification API.