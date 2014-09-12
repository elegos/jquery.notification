/*global jQuery, Notification*/

/*

jQuery Notification by Giacomo Furlan
http://giacomofurlan.name

The MIT License (MIT)

Copyright (c) 2014 Giacomo Furlan, http://giacomofurlan.name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

(function ($) {
    'use strict';
    
    /*
        Produces a notification.
        Returns the notification element
    */
    $.Notification = function (title, message, options, callbacks) {
        var data = {
                title: title || 'Notification',
                body: message || 'Simple message demo',
                options: {
                    dir: 'auto',                    // auto, ltr, rtl
                    lang: null,                     // BCP 47 language tag (shortest 2-3ALPHA ISO 639)
                    icon: null,                     // image to be used as notification icon
                    tag: null,                      // the tag to identify the notification
                    forceGritter: false             // force to use Gritter instead of the native notification
                },
                callbacks: {
                    onClick: null,
                    onShow: null,
                    onError: null,
                    onClose: null
                }
            },
            notificationAPI = false,
            notification = null,
            sendHtml5Notification = function () {
                if (Notification.permission === 'granted') {
                    var opt = {};

                    if (data.options.dir) { opt.dir = data.options.dir; }
                    if (data.options.lang) { opt.lang = data.options.lang; }
                    if (data.body) { opt.body = data.body; }
                    if (data.options.tag) { opt.tag = data.options.tag; }
                    if (data.options.icon) { opt.icon = data.options.icon; }
                    
                    notification = new Notification(data.title, opt);
                    
                    if (callbacks) {
                        if (callbacks.onClick) { notification.addEventListener('click', callbacks.onClick); }
                        if (callbacks.onShow) { notification.addEventListener('show', callbacks.onShow); }
                        if (callbacks.onError) { notification.addEventListener('error', callbacks.onError); }
                        if (callbacks.onClose) { notification.addEventListener('close', callbacks.onClose); }
                    }
                }
                
                return null;
            };
        
        $.extend(data.options, options);
        $.extend(data.callbacks, callbacks);
        
        if (!data.options.tag) {
            data.options.tag = (new Date()).getTime().toString();
        }
        
        if (!data.options.forceGritter && window.hasOwnProperty('Notification')) {
            notificationAPI = true;
        }
        
        // HTML5 notification system
        if (notificationAPI) {
            // Already granted, send notification
            if (Notification.permission === 'granted') {
                sendHtml5Notification();
            // Not granted, ask for permission and then send the notification
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    // Check and in case add the permission chosen by the user
                    if (!Notification.hasOwnProperty('permission')) {
                        Notification.permission = permission;
                    }
                    sendHtml5Notification();
                });
            }
        // Fallback to Gritter implementation
        } else {
            options = {title: data.title, text: data.body};
            
            if (data.options.icon) { options.image = data.options.icon; }
            
            if (callbacks) {
                if (callbacks.onShow) { options.after_open = callbacks.onShow; }
                if (callbacks.onClose) { options.after_close = callbacks.onClose; }
            }
            
            notification = $.gritter.add(options);
        }
        
        return notification;
    };
}(jQuery));