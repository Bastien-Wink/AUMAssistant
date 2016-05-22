window.scrollTo(0, document.body.scrollHeight);
window.scrollTo(0, 0);

var countHidden = 0;
var hideSeen = false;
var hideCharmed = false;
chrome.runtime.sendMessage({
    type: "setCount",
    count: countHidden
});
chrome.storage.local.get(['hideSeen', 'hideCharmed'], function(result) {
    hideSeen = result.hideSeen;
    hideCharmed = result.hideCharmed;
});

//UX improvement
var node = document.createElement('style');
node.innerHTML = "body #main #contentwrapper #content, body.lab #main #contentwrapper #content, .v3 .container, .search {width:100%;max-width:100%;text-align:center;} " +
    ".someone.medium.fade-in.is-filled.grid-4 {float:none} " +
    ".v3.user-grid .someone.large.fade-in {border: solid lightgrey 1px;background-image:none;} " +
    "#found-a-bug {display:none;} " +
    "body #main #contentwrapper #content {margin-bottom: 2000px;} " +
    ".v3.user-grid .someone .user-infos, .user-infos, .user-grid-title{margin:0px}" +
    ".burnedLabel{background: rgba(210, 21, 21, 0.68); color: lightgrey; font-weight: bold;}" +
    ".charmedLabel{background: pink; color: black; font-weight: bold;}" +
    ".openedLabel{background: #D4B06F; color: white; font-weight: bold;}" +
    ".newLabel{background: #83D683; color: black; font-weight: bold;}" +
    ".burnButton{background: lightgrey !important;border: outsetssssss 1px !important; padding: 0px 3px !important;} " +
    ".v3.user-grid .someone.large .user-tags{margin:5px 0} " +
    ".v3.user-grid .someone.large .heading-box .heading-box-content-wrapper, .v3.user-grid .someone.large .user-actions{margin-top:13px !important} "
"";
document.body.appendChild(node);

function manageSomeone(element, result) {
    if (element.find(".send-charm").attr("data-id") == undefined) {
        console.log(element.find(".send-charm"));
        return;
    }

    if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.burnedIds) > -1) {
        burnedDisplay(element);
        if (hideCharmed == true) {
            hideElement(element);
        }
    } else if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.charmedIds) > -1) {
        charmedDisplay(element);
        if (hideCharmed == true) {
            hideElement(element);
        }
    } else if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.openedIds) > -1) {
        openedDisplay(element);
        element.find(".view").before("<button class='burnButton'>Bruler!</button>");
        if (hideSeen == true) {
            hideElement(element);
        }
    } else {
        element.find(".heading-box").before("<div class='newLabel'>A voir</div>");
        element.find(".view").before("<button class='burnButton'>Bruler!</button>");
    }
}

chrome.storage.local.get(['openedIds', 'burnedIds', 'charmedIds', 'hideSeen'], function(result) {

    console.log("hideSeen : " + result.hideSeen);
    console.log("hideCharmed : " + result.hideCharmed);

    if (result.openedIds instanceof Array == false)
        result.openedIds = new Array;
    if (result.burnedIds instanceof Array == false)
        result.burnedIds = new Array;
    if (result.charmedIds instanceof Array == false)
        result.charmedIds = new Array;

    console.log(result.openedIds.length + " openedIds : ");
    console.log("" + result.openedIds);

    console.log(result.burnedIds.length + " burnedIds : ");
    console.log("" + result.burnedIds);

    console.log(result.charmedIds.length + " charmedIds : ");
    console.log("" + result.charmedIds);

    $('.someone .user-avatar').each(function() {
        manageSomeone($(this).closest(".someone"), result);
    });

    $('body').arrive('.someone .user-avatar', function() {
        manageSomeone($(this).closest(".someone"), result);
    });
});

$(document).on("click", ".someone .burnButton", function() {
    burnedDisplay($(this).closest(".someone"));
    setProfileBurned($(this).closest(".someone").find(".user-avatar a").attr("href").replace(/https\:\/\/www.adopteunmec.com\/profile\//g, ""));
});

$(document).on("click", ".send-charm", function(event) {
    charmedDisplay($(this).closest(".someone"));
    setProfileCharmed($(this).attr("data-id"));
});
