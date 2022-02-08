"use strict"; // var accordionItem = document.querySelector('.accordion__item');
// var accordionTrigger = document.querySelector('.accordion__trigger');
// var accordionContent = document.querySelector('.accordion__content');
// accordionItem.addEventListener('click', function () {
//     accordionTrigger.classList.toggle('accordion__trigger--active');
//     accordionContent.classList.toggle('accordion__content--active');
// });

document.querySelectorAll('.accordion__trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var parent = item.parentNode;
    parent.classList.toggle('accordion__item--active');
  });
}); // var accordionTrigger = document.querySelector('.accordion__item');
// accordionTrigger.addEventListener('click', function () {
//     accordionTrigger.classList.toggle('accordion__item--active');
// });