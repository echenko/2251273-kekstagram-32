import { uploadClose, tracksEscKeystrokes, unblockSubmit } from './upload-form.js';
import { escTracking } from './function.js';

const submitError = document.querySelector('#error').content.querySelector('.error');
const submitSuccess = document.querySelector('#success').content.querySelector('.success');

// функция закрытия модального окна
const closeModal = (evt) => {
  const modal = document.querySelector('.modal');
  const button = modal.querySelector('button');

  if (escTracking(evt) || evt.target === modal || evt.target === button) {
    unblockSubmit();
    modal.remove();
    document.removeEventListener('keydown', closeModal);
    document.removeEventListener('click', closeModal);
  }
};

// функция создания модального окна
const createModal = (popup) => {
  const modal = popup.cloneNode(true);

  modal.classList.add('modal');

  document.addEventListener('keydown', closeModal);
  document.addEventListener('click', closeModal);

  if (popup === submitSuccess) {
    uploadClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
  }

  document.body.append(modal);
};

// функции открытия модального окна
const modalError = () => createModal(submitError);
const modalSucces = () => createModal(submitSuccess);


export { modalError, modalSucces };

