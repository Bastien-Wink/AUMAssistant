var id = $("#member-id").html().substring(3);

window.addEventListener('focus', function () {
    setProfileOpened(id);
});

//112884989 is a girl created on the 18th of may 2016. Prefix for women : 1, men: 2. So id = 12884989
$(".profil-encart-sub-infos div").before("<span>Nouveau profile : " + Math.round(((id + "").substring(1)) * 100 / (12884989)) + "%" + "</span>")
$(".actions-block").after(
    '<div class="actions-block"><button id="skip" data-id="' + id + '" class="btn btn-full btn-mauvelous btn-general">Passer <span class="icon-flake"></span></button></div>' +
    '<div class="actions-block"><button id="hide" data-id="' + id + '" class="btn btn-full btn-mauvelous btn-general">Bruler <span class="icon-trash icon-paperplane"></span></button></div>')
$("#encart-popularite").attr("style", "margin-left:-750px;bottom: 0px; display: block; z-index: 1;")
$("#hide").attr("style", "height: 50px;font-size: 2.3rem;background: orangered;")
$("#skip").attr("style", "height: 50px;font-size: 2.3rem;background: orange;")

$("body").highlight("maman");
$("body").highlight("lol");
$("body").highlight("swag");
$(".profil-encart-title:first i").after(Math.round($(".encart-popularite-content  tr:nth-child(2) .calcul").html().match(/(.*)x.*/)[1].replace("&nbsp;", "") * 100 / $(".encart-popularite-content  tr:nth-child(3) .calcul").html().match(/(.*)x.*/)[1].replace("&nbsp;", "")) + "%");

$("body").after(`
    <style>
      .highlight {
        color: white;
        background: red;
      }
      .v3.profile .actions-block {
        margin: 10px 0 10px 1%;
        width: 32%;
        display: inline-block;
      }
      </style>
`);

$(document).on("click", "#hide", function (event) {
    setProfileBurned(id);
    //Todo that should be a callback instead of a timer
    $("body").fadeOut(1000, function () {
        window.close();
    })
});

$(document).on("click", ".charm", function (event) {
    setProfileCharmed(id);
    //Todo that should be a callback instead of a timer
    $(".profil-pic").fadeOut(1000, function () {
        window.close();
    })
});

$(document).on("click", "#skip", function (event) {
    window.close();
});

$("#header-user > div.user-popularity > div.popularity-value").html($("#header-box-user > ul:nth-child(2) > li:nth-child(2) > a").html());
