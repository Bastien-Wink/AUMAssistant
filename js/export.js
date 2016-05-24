chrome.storage.local.get(['charmedIds', 'burnedIds', 'openedIds'], function(result) {
    $("body").before("<br/>charmedIds:<br/>");
    $("body").before(result.charmedIds.join());
    $("body").before("<br/>burnedIds:<br/>");
    $("body").before(result.burnedIds.join());
    $("body").before("<br/>openedIds:<br/>");
    $("body").before(result.openedIds.join());
});
