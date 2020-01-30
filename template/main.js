/*-----------------------------------------------------------------------------
>>> «MAIN» TEMPLATE PART
-----------------------------------------------------------------------------*/

function getList(component) {
    var name = document.querySelector('.satus').dataset.path.split('/').filter(function(value) {
            return value != '';
        }),
        last = name[name.length - 1],
        category = Satus.storage.get('categories/' + last),
        object = {
            section: {
                type: 'section'
            }
        };

    if (Object.keys(category).length > 1) {
        for (var key in category) {
            if (key !== 'type' && key !== 'label') {
                object.section[key] = {
                    type: 'section',
                    class: ['satus-section--items'],

                    findTextField: {
                        type: 'text-field',
                        value: category[key].find_value,
                        dataset: {
                            path: 'categories/' + last + '/' + key + '/find_value'
                        },
                        on: {
                            keydown: function() {
                                var self = this;

                                setTimeout(function() {
                                    Satus.storage.set(self.dataset.path, self.value);
                                });
                            }
                        }
                    },
                    text: {
                        type: 'text',
                        value: '=>'
                    },
                    replaceTextField: {
                        type: 'text-field',
                        value: category[key].replace_value,
                        dataset: {
                            path: 'categories/' + last + '/' + key + '/replace_value'
                        },
                        on: {
                            keydown: function() {
                                var self = this;

                                setTimeout(function() {
                                    Satus.storage.set(self.dataset.path, self.value);
                                });
                            }
                        }
                    }
                };
            }
        }
    } else {
        object.section[last] = {
            type: 'text',
            label: 'categoryIsEmpty'
        };
    }

    object.button = {
        type: 'button',
        class: ['satus-button--create'],
        label: '+',
        on: {
            click: function() {
                document.querySelector('.satus').appendChild(Satus.components.dialog({
                    body: {
                        type: 'section',

                        findTextField: {
                            type: 'text-field',
                            id: 'item-find',
                            placeholder: 'find',
                            on: {
                                render: function(component) {
                                    setTimeout(function() {
                                        component.focus();
                                    });
                                }
                            }
                        },
                        replaceTextField: {
                            type: 'text-field',
                            id: 'item-replace',
                            placeholder: 'replace',
                            on: {
                                render: function(component) {
                                    setTimeout(function() {
                                        component.focus();
                                    });
                                }
                            }
                        }
                    },
                    footer: {
                        type: 'section',
                        class: ['satus-section--footer'],

                        create: {
                            type: 'button',
                            label: 'create',
                            on: {
                                click: function() {
                                    var find_value = document.querySelector('#item-find').value,
                                        replace_value = document.querySelector('#item-replace').value,
                                        path = document.querySelector('.satus').dataset.path.split('/').filter(function(value) {
                                            return value != '';
                                        }),
                                        path2 = Date.now();

                                    path = path[path.length - 1];

                                    if (find_value.length < 1 || replace_value.length < 1) {
                                        return false;
                                    }

                                    Satus.storage.set('categories/' + path + '/' + path2, {
                                        find_value: find_value,
                                        replace_value: replace_value
                                    });

                                    getList(document.querySelector('.satus-main__container .satus-section'));

                                    document.querySelector('.satus-dialog__scrim').click();
                                }
                            }
                        },
                        cancel: {
                            type: 'button',
                            label: 'cancel',
                            on: {
                                click: function() {
                                    document.querySelector('.satus-dialog__scrim').click();
                                }
                            }
                        }
                    }
                }));
            }
        }
    };

    setTimeout(function() {
        var parent = component.parentNode;

        parent.innerHTML = '';

        Satus.render(parent, object);
    });
}

Menu.main = {
    type: 'main',

    categories: {
        type: 'section',
        label: 'categories',
        on: {
            render: function(component) {
                component.innerHTML = '';

                if (Satus.storage.has('categories')) {
                    var categories = Satus.storage.get('categories');

                    for (var key in categories) {
                        Menu.main.categories[key] = {
                            type: 'folder',
                            label: categories[key].label,

                            section: {
                                type: 'section',

                                on: {
                                    render: getList
                                }
                            }
                        };
                    }
                } else {
                    Menu.main.categories.favorites = {
                        type: 'folder',
                        label: 'favorites',

                        section: {
                            type: 'section',

                            on: {
                                render: getList
                            }
                        }
                    };

                    Satus.storage.set('categories', {
                        favorites: {
                            label: 'favorites'
                        }
                    });
                }

                Satus.render(component, Menu.main.categories);
            }
        }
    },

    create_category: {
        type: 'button',
        class: ['satus-button--create'],
        label: '+',
        on: {
            click: function() {
                document.querySelector('.satus').appendChild(Satus.components.dialog({
                    body: {
                        type: 'section',

                        textField: {
                            type: 'text-field',
                            id: 'category-name',
                            placeholder: 'categoryName',
                            on: {
                                render: function(component) {
                                    setTimeout(function() {
                                        component.focus();
                                    });
                                }
                            }
                        }
                    },
                    footer: {
                        type: 'section',
                        class: ['satus-section--footer'],

                        create: {
                            type: 'button',
                            label: 'create',
                            on: {
                                click: function() {
                                    var name = document.querySelector('#category-name').value,
                                        path = name.replace(/(\W||\D)/g, '');

                                    if (name.length < 1) {
                                        return false;
                                    }

                                    Menu.main.categories[path] = {
                                        type: 'folder',
                                        label: name,

                                        section: {
                                            type: 'section',

                                            on: {
                                                render: getList
                                            }
                                        }
                                    };

                                    Satus.storage.set('categories/' + path, {
                                        label: name
                                    });

                                    document.querySelector('.satus-main__container').innerHTML = '';

                                    Satus.render(document.querySelector('.satus-main__container'), Menu.main);

                                    document.querySelector('.satus-dialog__scrim').click();
                                }
                            }
                        },
                        cancel: {
                            type: 'button',
                            label: 'cancel',
                            on: {
                                click: function() {
                                    document.querySelector('.satus-dialog__scrim').click();
                                }
                            }
                        }
                    }
                }));
            }
        }
    }

    /*settings: {
        type: 'section',
        label: 'settings',

        apply_to_plain_text: {
            type: 'switch',
            label: 'applyToPlainText',
            value: true
        },
        apply_to_text_fields: {
            type: 'switch',
            label: 'applyToTextFields'
        }
    }*/
};