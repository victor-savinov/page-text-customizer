var regex_data = {};

chrome.storage.local.get(function(items) {
    var categories = items.categories || {};

    for (var category_name in categories) {
        var category = categories[category_name];

        for (var item_name in category) {
            var item = category[item_name];

            if (item && item.find_value) {
                regex_data[item.replace_value] = new RegExp(item.find_value, 'gm');
            }
        }
    }

    observer.observe(document.documentElement, {
        subtree: true,
        childList: true
    });
});

function textNode(node) {
    for (var key in regex_data) {
        node.nodeValue = node.nodeValue.replace(regex_data[key], key);
    }
}

function inputNode(node) {
    for (var key in regex_data) {
        node.value = node.value.replace(regex_data[key], key);
    }
}

var observer = new MutationObserver(function(mutationsList) {
    for (var i = 0, l = mutationsList.length; i < l; i++) {
        for (var j = 0, k = mutationsList[i].addedNodes.length; j < k; j++) {
            var node = mutationsList[i].addedNodes[j];

            if (node.nodeValue) {
                textNode(node);
            } else if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                inputNode(node);
            }
        }
    }
});