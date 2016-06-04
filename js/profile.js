var id = $("#member-id").html().substring(3);
setProfileOpened(id);

//112884989 is a girl created on the 18th of may (preceding number : women : 1, men: 2) so id = 12884989
$(".profil-encart-sub-infos div").before("<span>Nouveau profile : " + Math.round(((id + "").substring(1)) * 100 / (12884989)) + "%" + "</span>")
$(".actions-block").after('<div class="actions-block"><button id="hide" data-id="' + id + '" class="btn btn-full btn-mauvelous btn-general">Bruler <span class="icon-ninja"></span></button></div>');
$("#encart-popularite").attr("style", "margin-left:-750px;bottom: 0px; display: block; z-index: 1;")
$("#hide").attr("style", "height: 40px;font-size: 2.3rem;background: red;")

$(document).on("click", "#hide", function(event) {
    setProfileBurned(id);
    $("body").fadeOut(1000, function() {
        window.close();
    })
});

$(document).on("click", ".charm", function(event) {
    setProfileCharmed(id);
    $(".profil-pic").fadeOut(1000, function() {
        window.close();
    })
});
