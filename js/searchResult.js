window.scrollTo(0, document.body.scrollHeight);
window.scrollTo(0, 0);

var countHidden = 0;

//Setting section
$("#user-grid").before(`
  <div id="extentionSettings">
      <input type="checkbox" id="hideCharmed" /> Cacher les profiles charm&eacute;s (ou brul&eacute;s)<br/>
      <input type="checkbox" id="hideSeen" /> Cacher les profiles ouverts
  </div>`);

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
          margin-top: 13px !important;
      }
      .v3.user-grid .someone .user-actions{
        height: 15px;
      }
      #extentionSettings {
          border: solid 1px;
          width: 250px;
          text-align: left;
          margin: 0px auto 8px auto;
          padding: 5px 20px;
      }
    </style>`);

chrome.storage.local.get(['hideSeen', 'hideCharmed'], function(result) {
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
});

function manageSomeone(element, result) {
    if (element.find(".send-charm").attr("data-id") == undefined) {
        console.log(element.find(".send-charm"));
        return;
    }

    if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.burnedIds) > -1) {
        burnedDisplay(element);
        if (result.hideCharmed == true) {
            hideElement(element);
        }else {
            showElement(element);
        }
    } else if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.charmedIds) > -1) {
        charmedDisplay(element);
        if (result.hideCharmed == true) {
            hideElement(element);
        }else {
            showElement(element);
        }
    } else if ($.inArray(parseInt(element.find(".send-charm").attr("data-id")), result.openedIds) > -1) {
        openedDisplay(element);
        if (result.hideSeen == true) {
            hideElement(element);
        } else {
            showElement(element);
        }
    } else {
        newDisplay(element);
    }
}

function init() {
    chrome.storage.local.get(['openedIds', 'burnedIds', 'charmedIds', 'hideSeen', 'hideCharmed'], function(result) {

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

        countHidden = 0 ;
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
}

$(document).on("click", ".someone .burnButton", function() {
    burnedDisplay($(this).closest(".someone"));
    setProfileBurned($(this).closest(".someone").find(".user-avatar a").attr("href").replace(/https\:\/\/www.adopteunmec.com\/profile\//g, ""));
});

$(document).on("click", ".send-charm", function(event) {
    charmedDisplay($(this).closest(".someone"));
    setProfileCharmed($(this).attr("data-id"));
});

init();
