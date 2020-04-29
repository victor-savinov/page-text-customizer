Menu.create = {
    type: 'button',
    before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    class: 'satus-button--create',
    onclick: function() {
        var dialog;

        if (document.querySelector('.satus-main__container').dataset.appearance === 'home') {
            dialog = {
                type: 'dialog',
                class: 'satus-dialog--create',

                label: {
                    type: 'text',
                    label: 'Name'
                },
                text_field: {
                    type: 'text-field',
                    class: 'satus-text-field--value',
                    onkeydown: function(event) {
                        if (event.keyCode === 13) {
                            create();
                        }
                    },
                    onrender: function() {
                        var self = this;

                        setTimeout(function() {
                            self.focus();
                        });
                    }
                },
                section: {
                    type: 'section',

                    button: {
                        type: 'button',
                        label: 'Create',
                        onclick: create
                    }
                }
            };
        } else {
            dialog = {
                type: 'dialog',
                class: 'satus-dialog--create',

                label: {
                    type: 'text',
                    label: 'Find'
                },
                text_field: {
                    type: 'text-field',
                    class: 'satus-text-field--value satus-text-field--find',
                    onrender: function() {
                        var self = this;

                        setTimeout(function() {
                            self.focus();
                        });
                    }
                },
                label2: {
                    type: 'text',
                    label: 'Replace'
                },
                text_field2: {
                    type: 'text-field',
                    class: 'satus-text-field--value satus-text-field--replace',
                    onkeydown: function(event) {
                        if (event.keyCode === 13) {
                            create();
                        }
                    }
                },
                section: {
                    type: 'section',

                    button: {
                        type: 'button',
                        label: 'Create',
                        onclick: create
                    }
                }
            };
        }

        Satus.render(dialog);
    }
};