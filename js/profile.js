var id = $("#member-id").html().substring(3);

window.addEventListener('focus', function () {
    setProfileOpened(id);
});

//112884989 is a girl created on the 18th of may 2016. Prefix for women : 1, men: 2. So id = 12884989
$(".profil-encart-sub-infos div").before("<span>Nouveau profile : " + Math.round(((id + "").substring(1)) * 100 / (12884989)) + "%" + "</span>")
$(".profil-encart-title:first i").after(Math.round($(".encart-popularite-content  tr:nth-child(2) .calcul").html().match(/(.*)x.*/)[1].replace("&nbsp;", "") * 100 / $(".encart-popularite-content  tr:nth-child(3) .calcul").html().match(/(.*)x.*/)[1].replace("&nbsp;", "")) + "%");

$(".actions-block").after(
    '<div class="actions-block">' +
    '<div class="btn-half">' +
    '<button id="skip" data-id="' + id + '" class="btn btn-full btn-mauvelous btn-general">Passer <span class="icon-flake"></span></button>' +
    '</div>' +
    '<div class="btn-half">' +
    '<button id="burn" data-id="' + id + '" class="btn btn-full btn-mauvelous btn-general">Bruler <span class="icon-trash icon-paperplane"></span></button>' +
    '</div>' +
    '</div>');
$("#header-user > div.user-popularity > div.popularity-value").html($("#header-box-user > ul:nth-child(2) > li:nth-child(2) > a").html());
$(".mail").html("message<span class='icon-messages'></span>");

$("body").highlight("maman");
$("body").highlight("lol");
$("body").highlight("swag");
$("body").highlight(" jours");
$("body").highlight("mois");
$("body").highlight("tpmp");

$("body").after(`
    <style>
      .strong {
        font-weight:bold !important;
      }
      .highlight {
        color: white;
        background: red;
      }
      .v3.profile .actions-block {
        margin: 10px 0 10px 1%;
        width: 49%;
        display: inline-block;
      }
      #burn{
        background: orangered;
      }
      #skip{
        background: orange;
      }
      #encart-popularite{
        margin-left:-750px !important;
        bottom: 0px !important;
        display: block !important;
        z-index: 1 !important;
      }
      .actions-block button{
          height: 40px !important;
          font-size: 1.5rem !important;
      }
      .v3.profile .actions-block .btn-half{
        vertical-align: baseline;
      }
      </style>
`);

$(document).on("click", ".charm", function () {
  if($("#header-charms-counter")[0].textContent.indexOf("0 charme") == -1)
    setProfileCharmed(id, closePageOnceNotificationDisplayed);
  else
    alert("0 charm");
});

$(document).on("click", "#burn", function () {
    setProfileBurned(id, function () {
        window.close()
    });
});

$(document).on("click", "#skip", function () {
    window.close();
});

// So you have just to use
$('*').bind('keypress', function (e) {
    if (e.which === 51 || e.which === 34) { // 3
        $(".charm").click();
    }
    else if (e.which === 49 || e.which === 38) { // 1
        $("#burn").click();
    }
    else if (e.which === 50 || e.which === 233) { // 2
        $("#skip").click();
    }
    else
        console.log(e.which);
});

function showStatus(localStorage) {
    if (isCharmed(id, localStorage))
        html = "Assistant Status : <span class='strong'>Charmed</span>";
    else if (isBurned(id, localStorage))
        html = "Assistant Status : <span class='strong'>Burned</span>";
    else if (isOpened(id, localStorage))
        html = "Assistant Status : <span class='strong'>Opened</span>";
    else
        html = "Assistant Status : New";

    $(".encart-popularite-content").prepend("<div style='text-align:center'>" + html + "</div>")
}

getLocalStorage(showStatus);
