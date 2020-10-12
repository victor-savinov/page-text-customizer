/*---------------------------------------------------------------
>>> HEADER
---------------------------------------------------------------*/

var Menu = {
    header: {
        type: 'header',

        section_start: {
            type: 'section',
            class: 'satus-section--align-start',

            button_back: {
                type: 'button',
                class: 'satus-button--back',
                before: '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M14 18l-6-6 6-6"/></svg>',
                onclick: function() {
                    document.querySelector('.satus-main').back();
                }
            },
            title: {
                type: 'text',
                class: 'satus-text--title'
            }
        },
        section_end: {
            type: 'section',
            class: 'satus-section--align-end',

            button_vert: {
                type: 'button',
                before: '<svg stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="5.25" r="0.45"/><circle cx="12" cy="12" r="0.45"/><circle cx="12" cy="18.75" r="0.45"/></svg>',
                onclick: {
                    type: 'dialog',
                    class: 'satus-dialog--vertical-menu',

                    language: {
                        type: 'select',
                        before: '<svg fill="var(--satus-theme-primary)" viewBox="0 0 24 24"><path d="M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z" /></svg>',
                        label: 'language',
                        options: [
                            {
                                label: 'English',
                                value: 'en'
                            },
                            {
                                label: 'Русский',
                                value: 'ru'
                            }
                        ],
                        onchange: function(name, value) {
                            satus.locale.import(value, function() {
                                var self = (this === window ? document.querySelector('.satus-main') : this),
                                    item = self.history[self.history.length - 1];

                                document.querySelector('.satus-text--title').innerText = satus.locale.getMessage(item.label) || satus.locale.getMessage('lists');

                                document.querySelector('.satus-dialog .satus-select__label').innerText = satus.locale.getMessage('language');
                                document.querySelector('.satus-dialog .satus-switch__label').innerText = satus.locale.getMessage('encryption');
                                document.querySelectorAll('.satus-dialog .satus-button__label')[0].innerText = satus.locale.getMessage('export');
                                document.querySelectorAll('.satus-dialog .satus-button__label')[1].innerText = satus.locale.getMessage('import');
                            });
                        }
                    },
                    export: {
                        type: 'button',
                        label: 'export',
                        before: '<svg viewBox="0 0 24 24" fill="none" stroke="var(--satus-theme-primary)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
                        onclick: function() {
                            if (location.href.indexOf('/options.html') !== -1) {
                                exportData();
                            } else {
                                chrome.tabs.create({
                                    url: 'options.html?action=export'
                                });
                            }
                        }
                    },
                    import: {
                        type: 'button',
                        label: 'import',
                        before: '<svg viewBox="0 0 24 24" fill="none" stroke="var(--satus-theme-primary)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
                        onclick: function() {
                            if (location.href.indexOf('/options.html') !== -1) {
                                importData();
                            } else {
                                chrome.tabs.create({
                                    url: 'options.html?action=import'
                                });
                            }
                        }
                    }
                }
            }
        }
    }
};
