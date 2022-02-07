'use strict';

const swiper = new Swiper('.prev-conferences__swiper', {

    direction: 'horizontal',
    loop: true,

    slidesPerView: 1,
    
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1440: {
            slidesPerView: 4,
            spaceBetween: 40,
        }
    },

    pagination: {
        el: '.prev-conferences__swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.prev-conferences__swiper-button-next',
        prevEl: '.prev-conferences__swiper-button-prev',
    },
});