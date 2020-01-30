/*-----------------------------------------------------------------------------
>>> «TABS» COMPONENT
-----------------------------------------------------------------------------*/

Satus.components.tabs = function(object) {
    var component = document.createElement('div'),
        component_head = document.createElement('div'),
        component_body = document.createElement('div'),
        component_highlight = document.createElement('div');

    component_head.className = 'satus-tabs__head';
    component_body.className = 'satus-tabs__body';
    component_highlight.className = 'satus-tabs__highlight';

    component_head.appendChild(component_highlight);

    component.select = function(index) {
        var tab = this.querySelectorAll('.satus-tabs__head > div:not(.satus-tabs__highlight)')[index];

        if (this.querySelector('.satus-tabs__head > div.selected')) {
            this.querySelector('.satus-tabs__head > div.selected').classList.remove('selected');
        }

        if (this.querySelector('.satus-tabs__body > div.selected')) {
            this.querySelector('.satus-tabs__body > div.selected').classList.remove('selected');
        }

        tab.classList.add('selected');

        this.querySelectorAll('.satus-tabs__body > div')[index].classList.add('selected');

        this.querySelector('.satus-tabs__highlight').style.left = tab.offsetLeft + 'px';
        this.querySelector('.satus-tabs__highlight').style.width = tab.offsetWidth + 'px';
    };

    for (var key in object) {
        if (typeof object[key] === 'object' && object[key].type === 'tab') {
            var head_item = document.createElement('div'),
            	body_item = document.createElement('div');

            head_item.innerText = Satus.memory.get('locale/' + object[key].label) || object[key].label || Satus.memory.get('locale/' + key) || key;
            head_item.addEventListener('click', function() {
                this.parentNode.parentNode.select(Array.prototype.indexOf.call(this.parentNode.children, this) - 1);
            });

            Satus.render(body_item, object[key]);

            component_head.appendChild(head_item);
            component_body.appendChild(body_item);
        }
    }

    setTimeout(function() {
        component.select(0);
    });

    component.appendChild(component_head);
    component.appendChild(component_body);

    return component;
};