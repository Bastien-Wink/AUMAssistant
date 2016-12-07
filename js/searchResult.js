window.scrollTo(0, document.body.scrollHeight);
window.scrollTo(0, 0);

var countHidden = 0;

//Setting section
$("#main").after(`
  <div id="extentionSettings">
    <div class="extentionSettingsContainer">
      <div class="extentionSettingsItem">
        <input type="checkbox" id="autoVisit" /> Visites auto<br/>
        <input type="checkbox" id="hideSeen" /> Cacher les profiles ouverts ou vide
      </div>
      <div class="extentionSettingsItem">
        <input type="checkbox" id="hideCharmed" /> Cacher les profiles charm&eacute;s<br/>
        <input type="checkbox" id="hideBurned" /> Cacher les profiles brul&eacute;s
      </div>
      <div class="extentionSettingsItem">
        <input type="button" id="openAll" value="Ouvrir tous" /><br/>
      </div>
    </div>
  </div>`);

$("#main").css({
    "padding-top": "124px"
});

//CSS
$("body").after(`
    <style>
      body #main #contentwrapper #content, body.lab #main #contentwrapper #content, .v3 .container, .search {
          width: 100%;
          max-width: 100%;
          text-align: center;
      }
      .someone.medium.fade-in.is-filled.grid-4 {
          float: none
      }
      .v3.user-grid .someone.large.fade-in {
          border: solid lightgrey 1px;
          background-image: none;
      }
      #found-a-bug {
          display: none;
      }
      body #main #contentwrapper #content {
          margin-bottom: 2000px;
      }
      .v3.user-grid .someone .user-infos, .user-infos, .user-grid-title {
          margin: 0px
      }
      .burnedLabel {
          background: rgba(210, 21, 21, 0.68);
          color: lightgrey;
          font-weight: bold;
      }
      .charmedLabel {
          background: pink;
          color: black;
          font-weight: bold;
      }
      .openedLabel {
          background: #D4B06F;
          color: white;
          font-weight: bold;
      }
      .newLabel {
          background: #83D683;
          color: black;
          font-weight: bold;
      }
      .burnButton {
          background: lightgrey !important;
          border: outset 1px !important;
          padding: 0px 3px !important;
      }
      .v3.user-grid .someone.large .user-tags {
          margin: 5px 0
      }
      .v3.user-grid .someone.large .heading-box .heading-box-content-wrapper, .v3.user-grid .someone.large .user-actions {
          margin-top: 14px !important;
      }
      .v3.user-grid .someone .user-actions{
        height: 15px;
      }
      .visitingMark {
        height: 130px;
        width: 130px;
        background: url(https://salarie.preventionpenibilite.fr/espacesalarie/images/loading.gif) no-repeat center;
        background-size: cover;
        opacity: 0.4;
        position: absolute;
        float: left;
      }
      .visitedMark {
        height: 130px;
        width: 130px;
        background: url(https://cdn0.iconfinder.com/data/icons/large-black-icons/512/Apply_ok_check_yes_dialog.png) no-repeat center;
        background-size: cover;
        opacity: 0.6;
        position: absolute;
      }
      #extentionSettings {
        width: 100%;
        text-align: left;
        position: fixed;
        top: 80px;
        background: #1c2228;
        z-index: 999;
        color: white;
        padding: 5px 10px;
      }
      .extentionSettingsContainer{
        width: 870px;
        margin: auto;
      }
      .extentionSettingsItem {
        float: left;
        padding: 0 0 0 64px;
        width: 220px;
      }
    </style>`);

chrome.storage.local.get(['hideSeen', 'hideCharmed', 'hideBurned'], function(result) {
    if (result.hideSeen == true) {
        $("input#hideSeen").prop('checked', true);
    }

    $("input#hideSeen").on("change", function() {

        chrome.storage.local.set({
            'hideSeen': $(this).is(':checked')
        });
        init();
    });

    if (result.hideCharmed == true) {
        $("input#hideCharmed").prop('checked', true);
    }
    $("input#hideCharmed").on("change", function() {

        chrome.storage.local.set({
            'hideCharmed': $(this).is(':checked')
        });
        init();
    });

    if (result.hideBurned == true) {
        $("input#hideBurned").prop('checked', true);
    }
    $("input#hideBurned").on("change", function() {

        chrome.storage.local.set({
            'hideBurned': $(this).is(':checked')
        });
        init();
    });
});

function visitNext() {

    element = $('.someone').filter(":visible").not(".visited").first();

    if (element == undefined || $("#autoVisit").is(':checked') == false) {
        return;
    }

    if (element.find(".view a").attr("href") != undefined) {
        console.log("visiting " + element.find(".view a").attr("href"))

        element.find(".user-avatar").after('<div class="visitingMark"></div><iframe onload="$(this).remove()" style="position: absolute;left: 999999px;" width="1" height="1" frameborder="0px" scrolling="no" marginheight="0" marginwidth="0"  src="' + element.find(".view a").attr("href") + '"></iframe>');

        $('html, body').animate({
            scrollTop: element.offset().top - 300
        }, "slow");
    } else {
        console.log("No url found in " + element)
    }

    setTimeout(function() {
        $(".visitingMark").remove();
        element.addClass("visited");
        element.find(".user-avatar").after("<div class='visitedMark'></div>")
        visitNext()
    }, Math.random() * 4000 + 1000)

}

function manageSomeone(element, result) {
    if (element.find(".send-charm").attr("data-id") == undefined) {
        console.log(element.find(".send-charm"));
        return;
    }

    if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.charmedIds) > -1) {
        if (result.hideCharmed == true) {
            hideElement(element);
        } else {
            charmedDisplay(element);
        }
    } else if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.burnedIds) > -1) {
        if (result.hideBurned == true) {
            hideElement(element);
        } else {
            burnedDisplay(element);
        }
    } else if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.openedIds) > -1) {
        if (result.hideSeen == true) {
            hideElement(element);
        } else {
            openedDisplay(element);
        }
    } else if (element.find(".empty-desc").length > 0) {
        if (result.hideSeen == true) {
            hideElement(element);
        } else {
            newDisplay(element);
        }
    } else {
        newDisplay(element);
    }
}

function init() {
    chrome.storage.local.get(['openedIds', 'burnedIds', 'charmedIds', 'hideSeen', 'hideCharmed', 'hideBurned'], function(result) {

        console.log("hideSeen : " + result.hideSeen);
        console.log("hideCharmed : " + result.hideCharmed);
        console.log("hideBurned : " + result.hideBurned);

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

        countHidden = 0;
        chrome.runtime.sendMessage({
            type: "setCount",
            count: countHidden
        });

        $('.someone .user-avatar').each(function() {
            manageSomeone($(this).closest(".someone"), result);
        });

        $('body').arrive('.someone .user-avatar', function() {
            manageSomeone($(this).closest(".someone"), result);
        });

    });

    $("#header-user > div.user-popularity > div.popularity-value").html($("#header-box-user > ul:nth-child(2) > li:nth-child(2) > a").html());

}

$(document).on("click", ".someone .burnButton", function() {
    setProfileBurned($(this).closest(".someone").find(".send-charm").attr("data-id"));
    burnedDisplay($(this).closest(".someone"));
});

$(document).on("click", ".send-charm", function(event) {
    setProfileCharmed($(this).attr("data-id"));
    charmedDisplay($(this).closest(".someone"));
});

$(document).on("click", "#openAll", function(event) {
    var count = 0;
    $(".someone:visible .user-grid-title a").each(function(e) {
        count = count + 1;
        if (count >= 10) {
            return false;
        }
        window.open($(this).attr("href"), '_blank');
    });
});

$(document).on("change", "#autoVisit", function(event) {
    visitNext()
});

init();
