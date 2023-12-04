
if(!$.cookie('langData')){
    $('#cpc_warps').addClass('body_blur');
    var innerHTML = `
        <div id="cpc-lang-selector-overlay">
            <div class="cpc-lang-selector-overlay-content" role="dialog" aria-labelledby="welcomeMsgLangSelector">
            <label id="welcomeMsgLangSelector">Welcome to Canada Post. Bienvenue à Postes Canada</label>
            <div class="cpc-logo"><img src="/cpc/img/logos/cpc-logo.svg" alt="Canada Post/Postes Canada"></div>
            <div class="welcome-title" id="engWelcome">Welcome to Canada Post</div>
            <div class="welcome-title" id="freWelcome">Bienvenue à Postes Canada</div>
            <div class="lang-buttons">
                <a href="#" id="engLangSelector" class="lang-button">English</a>
                <a href="#" id="freLangSelector" class="lang-button">Français</a>
            </div>
            <div class="canada-logo"><a href="javascript:;" id="canada-gov-logo"><img src="/cpc/img/logos/gov-canada-logo.svg" alt="Canada"></a></div>
            </div>
        </div>
    `
    $('body').append(innerHTML)
}else{
    console.log('122223');
    $('#cpc_warps1').removeClass('body_blur');
    $('#cpc_warps2').removeClass('body_blur');
    if($.cookie('langData') == 'en'){
        $('.en_warp').show()
        $('.fr_warp').remove()
    }
    if($.cookie('langData') == 'fr'){
        $('.fr_warp').show()
        $('.en_warp').remove()
    }
}

$('#engLangSelector').on('click',function(){
    $.cookie('langData', 'en');
    window.langdata = 'en'
    location.reload()
})
$('#freLangSelector').on('click',function(){
    $.cookie('langData', 'fr');
    window.langdata = 'fr'
    location.reload()
})