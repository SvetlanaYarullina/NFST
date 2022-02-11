"use strict"; // document.querySelectorAll('.accordion__trigger').forEach((item) =>
//     item.addEventListener('click', () => {
//         const parent = item.parentNode;
//         parent.classList.toggle('accordion__item--active');
//     })
//     )

document.querySelectorAll('[data-accordion-trigger]').forEach(function (item) {
  return item.addEventListener('click', function () {
    var parent = item.parentNode;
    parent.classList.toggle('accordion__item--active');
  });
});