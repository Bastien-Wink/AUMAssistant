function scrollBlink() {
    $(window).scrollTop($(window).scrollTop() + 1);
    $(window).scrollTop($(window).scrollTop() - 1);
}

function scrollLoad() {
    $("body").css("opacity", 0.2);
    $("body").css("background", "white");

    window.scrollTo(0, document.body.scrollHeight);
    var x = 0;
    var intervalID = setInterval(function() {
        window.scrollTo(0, document.body.scrollHeight);
        if (++x === 10) {
            window.clearInterval(intervalID);
            window.scrollTo(0, 0);
            $("body").css("opacity", 1);
        }
    }, 10);
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

function charmedDisplay(element) {
    element.find(".newLabel").hide();
    element.find(".burnedLabel").hide();
    element.find(".openedLabel").hide();
    element.find(".heading-box").before("<div class='charmedLabel'>Charmé</div>");
}

function burnedDisplay(element) {
    element.find(".burnButton").hide();
    element.find(".newLabel").hide();
    element.find(".charmedLabel").hide();
    element.find(".openedLabel").hide();
    element.find(".heading-box").before("<div class='burnedLabel'>Brulé</div>");
}

function openedDisplay(element) {
    element.find(".charmedLabel").hide();
    element.find(".burnedLabel").hide();
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
