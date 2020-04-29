function change(old_index, new_index) {
    var main = document.querySelector('.satus-main'),
        data = JSON.parse(Satus.storage.get('data') || '{}'),
        data2 = data,
        clone;

    if (main.history.length > 1) {
        data = data[main.history[main.history.length - 1].storage_key];
    }

    old_index2 = Number(document.querySelectorAll('.satus-main .satus-list li')[old_index].querySelector('*').dataset.key);
    new_index2 = Number(document.querySelectorAll('.satus-main .satus-list li')[new_index].querySelector('*').dataset.key);

    clone = Object.assign(data[old_index2]);

    data[old_index2] = data[new_index2];
    data[new_index2] = clone;

    Satus.storage.set('data', JSON.stringify(data2));
}

function remove() {
    var main = document.querySelector('.satus-main'),
        history_item = main.history[main.history.length - 1],
        data = JSON.parse(Satus.storage.get('data') || '{}');

    if (main.history.length > 1) {
        var key = this.parentNode.querySelector('.satus-button').dataset.key;

        delete data[history_item.storage_key][key];
        delete history_item[key];

        Satus.storage.set('data', JSON.stringify(data));

        var object = Object.assign(history_item);

        delete object.type;

        document.querySelector('.satus-scrollbar__content').innerHTML = '';

        update();
    } else {
        delete data[this.parentNode.querySelector('.satus-folder').dataset.key];

        Satus.storage.set('data', JSON.stringify(data));

        document.querySelector('.satus-scrollbar__content').innerHTML = '';

        update();
    }
}

function edit() {
    var main = document.querySelector('.satus-main'),
        history_item = main.history[main.history.length - 1],
        data = JSON.parse(Satus.storage.get('data') || '{}'),
        key = this.parentNode.querySelector('.satus-button').dataset.key;

    function edit2() {
        data[history_item.storage_key][key].find = document.querySelector('.satus-text-field--find').value;
        data[history_item.storage_key][key].replace = document.querySelector('.satus-text-field--replace').value;

        Satus.storage.set('data', JSON.stringify(data));

        document.querySelector('.satus-dialog__scrim').click();
    }

    Satus.render({
        type: 'dialog',
        class: 'satus-dialog--create',

        label: {
            type: 'text',
            label: 'Find'
        },
        text_field: {
            type: 'text-field',
            class: 'satus-text-field--value satus-text-field--find',
            value: data[history_item.storage_key][key].find,
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
            value: data[history_item.storage_key][key].replace,
            onkeydown: function(event) {
                if (event.keyCode === 13) {
                    edit2();
                }
            }
        },
        section: {
            type: 'section',

            button: {
                type: 'button',
                label: 'Create',
                onclick: edit2
            }
        }
    });
}

function update(container) {
    var self = (this === window ? document.querySelector('.satus-main') : this),
        item = self.history[self.history.length - 1],
        id = item.appearanceKey,
        data = JSON.parse(Satus.storage.get('data') || '{}'),
        ui = {
            list: {
                type: 'list',
                compact: true,
                sortable: true,
                onchange: change
            }
        };

    if (!Satus.isset(container)) {
        container = document.querySelector('.satus-main__container');
    }

    document.body.dataset.appearance = id;
    container.dataset.appearance = id;

    document.querySelector('.satus-text--title').innerText = Satus.locale.getMessage(item.label) || 'Categories';

    container.querySelector('.satus-scrollbar__content').innerHTML = '';

    if (item.appearanceKey === 'home') {
        if (Object.keys(data).length === 0) {
            ui.list = {
                type: 'list',
                compact: true,
                sortable: true,
                onchange: change,

                0: {
                    type: 'section',

                    folder: {
                        type: 'folder',
                        label: 'Favorites',
                        before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
                        appearanceKey: 'list',
                        storage_key: 0
                    },


                    button: {
                        type: 'button',
                        class: 'satus-button--remove',
                        before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                        onclick: remove
                    }
                }
            };

            data[0] = {
                name: 'Favorites'
            };

            Satus.storage.set('data', JSON.stringify(data));

            data[0].storage_key = 0;
        } else {
            for (var key in data) {
                ui.list[key] = {
                    type: 'section',

                    folder: {
                        type: 'folder',
                        label: data[key].name,
                        before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
                        appearanceKey: 'list',
                        storage_key: key,
                        dataset: {
                            key: key
                        }
                    },

                    button: {
                        type: 'button',
                        class: 'satus-button--remove',
                        before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                        onclick: remove
                    }
                };

                for (var key2 in data[key]) {
                    if (data[key][key2].hasOwnProperty('find')) {
                        ui.list[key].folder[key2] = data[key][key2];
                    }
                }
            }
        }
    } else if (item.appearanceKey === 'list') {
        var has_tasks = false;

        for (var key in item) {
            if (item[key].hasOwnProperty('find')) {
                has_tasks = true;
            }
        }

        if (has_tasks === false) {
            ui.list.class = 'satus-list--message';

            ui.list.message = {
                type: 'text',
                innerText: 'No items'
            };
        } else {
            for (var key in data[item.storage_key]) {
                if (data[item.storage_key][key].hasOwnProperty('find')) {
                    ui.list[key] = {
                        type: 'section',

                        button: {
                            type: 'button',
                            label: data[item.storage_key][key].find,
                            storage_key: key,
                            dataset: {
                                key: key
                            },
                            onclick: edit
                        },

                        remove: {
                            type: 'button',
                            class: 'satus-button--remove',
                            before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                            onclick: remove
                        }
                    };
                }
            }
        }
    }

    Satus.render(ui, container.querySelector('.satus-scrollbar__content'));
}

function create() {
    var main = document.querySelector('.satus-main'),
        history_item = main.history[main.history.length - 1],
        data = JSON.parse(Satus.storage.get('data') || '{}'),
        value = document.querySelector('.satus-text-field--value').value;

    if (history_item.appearanceKey === 'home') {
        var key = new Date().getTime();

        data[key] = {
            name: value
        };

        Satus.storage.set('data', JSON.stringify(data));

        history_item[key] = {
            type: 'section',

            folder: {
                type: 'folder',
                label: value,
                before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
                appearanceKey: 'list',
                storage_key: key
            }
        };

        document.querySelector('.satus-scrollbar__content').innerHTML = '';

        update();
    } else {
        var folder_key = history_item.storage_key,
            task_key = new Date().getTime();

        data[folder_key][task_key] = {
            find: document.querySelector('.satus-text-field--find').value,
            replace: document.querySelector('.satus-text-field--replace').value
        };

        Satus.storage.set('data', JSON.stringify(data));

        history_item[task_key] = {
            type: 'section',

            button: {
                type: 'button',
                label: value,
                storage_key: task_key,
                dataset: {
                    key: task_key
                },
                onclick: edit
            },

            remove: {
                type: 'button',
                class: 'satus-button--remove',
                before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                onclick: remove
            }
        };

        document.querySelector('.satus-scrollbar__content').innerHTML = '';

        update();
    }

    document.querySelector('.satus-dialog__scrim').click();
}