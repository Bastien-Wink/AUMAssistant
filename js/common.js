function scrollBlink() {
    $(window).scrollTop($(window).scrollTop() + 1);
    $(window).scrollTop($(window).scrollTop() - 1);
}

function hideElement(element) {
    // element.fadeOut(500, scrollBlink);
    element.hide();
    scrollBlink();
    countHidden = countHidden + 1;
    chrome.runtime.sendMessage({
        type: "setCount",
        count: countHidden
    });
}

function showElement(element) {
    // element.fadeOut(500, scrollBlink);
    element.show();
}

function newDisplay(element) {
    element.find(".charmedLabel, .burnedLabel, .openedLabel, .newLabel, .burnButton").remove();
    element.find(".view").before("<button class='burnButton'>Bruler!</button>");
    element.find(".heading-box").before("<div class='newLabel'>A voir</div>");

}

function charmedDisplay(element) {
    element.find(".charmedLabel, .burnedLabel, .openedLabel, .newLabel, .burnButton").remove();
    element.find(".view").before("<button class='burnButton'>Bruler!</button>");
    element.find(".heading-box").before("<div class='charmedLabel'>Charmé</div>");
}

function burnedDisplay(element) {
    element.find(".charmedLabel, .burnedLabel, .openedLabel, .newLabel, .burnButton").remove();
    element.find(".heading-box").before("<div class='burnedLabel'>Brulé</div>");
}

function openedDisplay(element) {
    element.find(".charmedLabel, .burnedLabel, .openedLabel, .newLabel, .burnButton").remove();
    element.find(".view").before("<button class='burnButton'>Bruler!</button>");
    element.find(".heading-box").before("<div class='openedLabel'>Profile ouvert</div>");
}

function setProfileBurned(id) {
    chrome.storage.local.get('burnedIds', function(result) {

        if (result.burnedIds instanceof Array == false)
            result.burnedIds = new Array;

        //Add current profile id
        result.burnedIds.push(parseInt(id));

        //Make unique
        result.burnedIds = Array.from(new Set(result.burnedIds));

        chrome.storage.local.set({
            'burnedIds': result.burnedIds
        }, function() {
            // Notify that we saved.
            console.log(result.burnedIds.length + " burnedIds (including new one) ");
            console.log("" + result.burnedIds);
        });
    });
}

function setProfileCharmed(id) {
    chrome.storage.local.get('charmedIds', function(result) {

        if (result.charmedIds instanceof Array == false)
            result.charmedIds = new Array;

        //Add current profile id
        result.charmedIds.push(parseInt(id));

        //Make unique
        result.charmedIds = Array.from(new Set(result.charmedIds));

        chrome.storage.local.set({
            'charmedIds': result.charmedIds
        }, function() {
            // Notify that we saved.
            console.log(result.charmedIds.length + " charmedIds (including new one) ");
            console.log("" + result.charmedIds);
        });
    });
}

function setProfileOpened(id) {
    chrome.storage.local.get('openedIds', function(result) {

        if (result.openedIds instanceof Array == false)
            result.openedIds = new Array;

        //Add current profile id
        result.openedIds.push(parseInt(id));

        //Make unique
        result.openedIds = Array.from(new Set(result.openedIds));

        chrome.storage.local.set({
            'openedIds': result.openedIds
        }, function() {
            // Notify that we saved.
            console.log(result.openedIds.length + " openedIds (including new one) ");
            console.log("" + result.openedIds);
        });
    });

}
