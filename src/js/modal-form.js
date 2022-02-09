var modalLink = document.querySelectorAll('.link-registration');
var modal = document.querySelector('.modal--registration');
var modalClose = document.querySelector('.modal__close');

modalLink.forEach((link) =>
    link.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.classList.add('modal--show');
    })
);

modalClose.addEventListener('click', () => { 
    modal.classList.remove('modal--show'); 
});


