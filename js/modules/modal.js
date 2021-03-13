function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   // modal.classList.toggle('show');
   document.body.style.overflow = 'hidden';

   console.log(modalTimerId);
   if (modalTimerId) {
      clearInterval(modalTimerId);
   }
}

function closeMod(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('hide');
   modal.classList.remove('show');
   // modal.classList.toggle('show');
   document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
   // MODAL

   const modalOpen = document.querySelectorAll(triggerSelector, modalTimerId),
   //   modalClose = document.querySelector('[data-close]'),
     modal = document.querySelector(modalSelector);



modalOpen.forEach(item => {
   item.addEventListener('click',() => openModal(modalSelector, modalTimerId));
   // modal.classList.add('show');  // modal по умолчанию display: none
   // modal.classList.remove('hide');
});

// modalClose.addEventListener('click', closeMod); //передаем название функции, она будет выполнена ток после клика

modal.addEventListener('click', (e) => {
   if (e.target === modal || e.target.getAttribute('data-close') == '') {
       closeMod(modalSelector); //вызываем функцию, т.к ее рил надо выполнить
   }
});

document.addEventListener('keydown', (e) => {
   if (e.code === "Escape" && modal.classList.contains('show')) {
       closeMod(modalSelector);
   }
});


function showModalByScroll() {
   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
       openModal(modalSelector, modalTimerId);
       window.removeEventListener('scroll', showModalByScroll);
       // clearInterval(modalTimerId);
   }
}

window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeMod};
export {openModal};