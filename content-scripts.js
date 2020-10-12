var regex_data = {};

chrome.storage.local.get(function(items) {
    var lists = JSON.parse(items.data || '{lists:[]}').lists;

    for (var i = 0, l = lists.length; i < l; i++) {
        var list = lists[i];

        for (var j = 0, k = list.items.length; j < k; j++) {
            var item = list.items[j];

            if (item && item.find) {
                regex_data[item.replace] = new RegExp(item.find, 'gm');
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
