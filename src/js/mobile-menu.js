"use strict";

var toggleMenu = document.querySelector('.menu__toggle');
var menuBody = document.querySelector ('.menu__body');
if (toggleMenu) { 
    toggleMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('__lock');
        toggleMenu.classList.toggle('menu__toggle--active');
        menuBody.classList.toggle('menu__body--active');
    });
}