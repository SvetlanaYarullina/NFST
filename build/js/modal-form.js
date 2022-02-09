"use strict";

var modalLink = document.querySelectorAll('.link-registration');
var modal = document.querySelector('.modal--registration');
var modalClose = document.querySelector('.modal__close');
modalLink.forEach(function (link) {
  return link.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--show');
  });
});
modalClose.addEventListener('click', function () {
  modal.classList.remove('modal--show');
});