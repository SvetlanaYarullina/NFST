"use strict";

document.querySelectorAll('.accordion__trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var parent = item.parentNode;
    parent.classList.toggle('accordion__item--active');
  });
}); // var accordionItem = document.querySelectorAll('.accordion__item');
// var accordionTrigger = document.querySelectorAll('.accordion__trigger');
// var accordionContent = document.querySelectorAll('.accordion__content');
// accordionItem.addEventListener('click', function () {
//     accordionTrigger.classList.toggle('accordion__trigger--active');
//     accordionContent.classList.toggle('accordion__content--active');
// });