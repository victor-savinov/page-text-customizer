Satus.components.textField = function(object, key) {
    var component = object.rows > 1 ? document.createElement('textarea') : document.createElement('input');

    if (object.placeholder) {
        component.placeholder = Satus.memory.get('locale/' + object.placeholder) || object.placeholder;
    }

    return component;
};
