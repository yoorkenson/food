import {closeMod, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    

   // FORMS

   const forms = document.querySelectorAll(formSelector);

   const message = {
       loading: 'icons/spinner.svg',
       success: 'спасибо',
       failure: 'не получилось'
   };

   forms.forEach(item => {
       bindPostData(item);
   });



   function bindPostData(form) { //ф-я постинга данных
       form.addEventListener('submit', (e) => {
           e.preventDefault();

           const statusMessage = document.createElement('img');
           statusMessage.src = message.loading;
           statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
           `;
           form.insertAdjacentElement('afterend', statusMessage);
          

           const formData = new FormData(form);

           const json = JSON.stringify(Object.fromEntries(formData.entries()));

           postData('http://127.0.0.1:3000/requests', json)
           .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
           }).catch(() => {
               showThanksModal(message.failure);
           }).finally(() => {
               form.reset();
           });
       });
   }

   function showThanksModal(message) {
       const prevModalDialog = document.querySelector('.modal__dialog');

       prevModalDialog.classList.add('hide');

       openModal('.modal', modalTimerId);
       const thanksModal = document.createElement('div');
       thanksModal.classList.add('modal__dialog');
       thanksModal.innerHTML = `
           <div class="modal__content">
               <div class="modal__close" data-close>×</div>
               <div class="modal__title">${message}</div>
           </div>
       `;

       document.querySelector('.modal').append(thanksModal);
       setTimeout(() => {
           thanksModal.remove();
           prevModalDialog.classList.add('show');
           prevModalDialog.classList.remove('hide');
           closeMod('.modal');
       }, 4000);
   }

//    http://localhost:3000/menu

   fetch('http://127.0.0.1:3000/menu')
       .then(data => data.json())
       .then(res => console.log(res));


}

export default forms;