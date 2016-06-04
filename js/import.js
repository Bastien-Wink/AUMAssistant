$("form").on("submit", function(event) {
    event.preventDefault();
    console.log();


    try {
        var data = JSON.parse($(this).find("textarea").val()); // this is how you parse a string into JSON

        if (data.openedIds instanceof Array == false || data.burnedIds instanceof Array == false || data.charmedIds instanceof Array == false)
            throw "missing key";

    } catch (ex) {
        alert("Invalid text " + ex);
        return;
    }

    chrome.storage.local.set({
        'openedIds': data.openedIds,
        'charmedIds': data.charmedIds,
        'burnedIds': data.burnedIds,
    }, function() {
        $("body").fadeOut(1000, function() {
            window.close();
        })
    });


});
