satus.storage.import(function() {
    satus.modules.updateStorageKeys(Menu, function() {
        satus.locale.import(satus.storage.get('language'), function() {
            satus.render(Menu);
        });
    });
});
