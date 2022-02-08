'use strict';

const swiperLocation = new Swiper('.location-section__swiper', {

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