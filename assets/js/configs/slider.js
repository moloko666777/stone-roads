var mySwiper = undefined;

function initSwiper() {
    var screenWidth = $(window).outerWidth();
    if ((screenWidth < (851)) && (mySwiper == undefined)) {
        mySwiper = new Swiper('.head__slider-container', {
            speed: 400,
            // spaceBetween: 100,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
        });
    } else if ((screenWidth > 850) && (mySwiper != undefined)) {
        mySwiper.destroy();
        mySwiper = undefined;
        $('.swiper-wrapper').removeAttr('style');
        $('.swiper-slide').removeAttr('style');
    }
}

initSwiper();

$(window).resize(function () {
    initSwiper();
});