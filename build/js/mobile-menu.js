"use strict";

var toggleMenu = document.querySelector('[data-menu-toggle]');
var menuBody = document.querySelector('[data-menu-body]');

if (toggleMenu) {
  toggleMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('__lock');
    toggleMenu.classList.toggle('menu__toggle--active');
    menuBody.classList.toggle('menu__body--active');
  });
}