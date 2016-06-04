$("button#reset").on("click", function() {
    chrome.storage.local.clear(function() {
        alert('Voila !');
    })
});

$("button#export").on("click", function() {
    chrome.windows.create({
        'url': 'export.html',
        'type': 'popup'
    });
});

$("button#import").on("click", function() {
    chrome.windows.create({
        'url': 'import.html',
        'type': 'popup'
    });
});
