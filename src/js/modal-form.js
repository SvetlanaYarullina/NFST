'use strict';
// var modalLink = document.querySelectorAll('.link-registration');
// var modal = document.querySelector('.modal--registration');
// var modalClose = document.querySelector('[data-modal-close]');

// modalLink.forEach((link) =>
//     link.addEventListener('click', (evt) => {
//         evt.preventDefault();
//         modal.classList.add('modal--show');
//     })
// );

// modalClose.addEventListener('click', () => { 
//     modal.classList.remove('modal--show'); 
// });

let modalLink = document.querySelectorAll('.link-registration');
let modal = document.querySelector('[data-modal-registration]');
let modalClose = document.querySelector('[data-modal-close]');
// let modalClose = modal.dataset.modalClose;
let modalCloseWrapper = document.querySelector('[data-modal-wrapper]');

modalLink.forEach(function (link) {
  return link.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--show');
    document.body.classList.add('__lock');
  });
});

modalClose.addEventListener('click', function () {
  modal.classList.remove('modal--show');
  document.body.classList.remove('__lock');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    modal.classList.remove('modal--show');
    document.body.classList.remove('__lock');
  }
});

modalCloseWrapper.addEventListener('click', function (e) {
  if (!e.target.closest('.modal__content')){
    console.log('Клик');
    modal.classList.remove('modal--show');
    document.body.classList.remove('__lock');
  } 
});
