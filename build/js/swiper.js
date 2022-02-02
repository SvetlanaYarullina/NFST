'use strict'; // import Swiper from 'swiper';
// import "../../node_modules/swiper/swiper-bundle.min";

var swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  } // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },

}); // // // init Swiper:
// // const swiper = new Swiper('.swiper', {
// //     // configure Swiper to use modules
// //     modules: [Navigation, Pagination]
// //   });