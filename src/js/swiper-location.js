'use strict';

const swiper = new Swiper('.location-section__swiper', {

    direction: 'horizontal',
    loop: true,

    autoplay: {
        delay: 2000,
    },

    pagination: {
        el: '.location-section__swiper-pagination',
        clickable: true,
    },
});