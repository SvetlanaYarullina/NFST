'use strict'; // var modalLink = document.querySelectorAll('.link-registration');
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

var modalLink = document.querySelectorAll('.link-registration');
var modal = document.querySelector('[data-modal-registration]');
var modalClose = document.querySelector('[data-modal-close]'); // let modalClose = modal.dataset.modalClose;

var modalCloseWrapper = document.querySelector('[data-modal-wrapper]');
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
modalCloseWrapper.addEventListener('click', function () {
  modal.classList.remove('modal--show');
  document.body.classList.remove('__lock');
});