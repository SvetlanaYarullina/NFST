"use strict";

let toggleMenu = document.querySelector('[data-menu-toggle]');
let menuBody = document.querySelector('[data-menu-body]');
let menuWrapper = document.querySelector('[data-menu-wrapper]');
if (toggleMenu) {
    toggleMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('__lock');
        toggleMenu.classList.toggle('menu__toggle--active');
        menuBody.classList.toggle('menu__body--active');
        menuWrapper.classList.toggle('menu__wrapper--active');
    });
}

menuWrapper.addEventListener('click', function (e) {
    if (!e.target.closest('.menu__body')) {
        console.log('Клик');
        document.body.classList.remove('__lock');
        toggleMenu.classList.remove('menu__toggle--active');
        menuBody.classList.remove('menu__body--active');
        menuWrapper.classList.remove('menu__wrapper--active');
    }
});