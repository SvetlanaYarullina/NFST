"use strict";

var iconMenu = document.querySelector('.menu__icon');
var menuBody = document.querySelector ('.menu__body');
if (iconMenu) { 
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('__lock');
        iconMenu.classList.toggle('menu__icon--active');
        menuBody.classList.toggle('menu__body--active');
    });
}