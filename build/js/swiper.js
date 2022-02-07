'use strict';

var swiper = new Swiper('.location-section__swiper', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 2000
  },
  pagination: {
    el: '.swiper-pagination'
  }
});