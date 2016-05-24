chrome.storage.local.get(['hideSeen', 'hideCharmed'], function(result) {
    if (result.hideSeen == true) {
        $("input#hideSeen").prop('checked', true);
    }

    $("input#hideSeen").on("change", function() {

        chrome.storage.local.set({
            'hideSeen': $(this).is(':checked')
        });

        chrome.tabs.executeScript({
            code: 'if(window.location.hostname == "www.adopteunmec.com"){ location.reload() };'
        });
        window.close();
    });

    if (result.hideCharmed == true) {
        $("input#hideCharmed").prop('checked', true);
    }
    $("input#hideCharmed").on("change", function() {

        chrome.storage.local.set({
            'hideCharmed': $(this).is(':checked')
        });

        chrome.tabs.executeScript({
            code: 'if(window.location.hostname == "www.adopteunmec.com"){ location.reload() };'
        });
        window.close();
    });
});

$("button#reset").on("click", function() {
    chrome.storage.local.set({
        'burnedIds': new Array
    });
    chrome.storage.local.set({
        'openedIds': new Array
    }, function() {
        // Notify that we saved.
        alert('Done !');
    });
});

$("button#export").on("click", function() {

    chrome.windows.create({
        'url': 'export.html',
        'type': 'popup'
    });
});
