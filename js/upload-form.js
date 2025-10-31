import { createSlider } from './image-filter.js';
import { sendData } from './api.js';
import { checkingHashtag } from './cheking-hashtag.js';
import { modalError, modalSucces } from './modal.js';
import { loadImage } from './image-load.js';
import { escTracking } from './function.js';


const DESCRIPTION_LENGTH = 140;

const uploadSelectImage = document.querySelector('.img-upload__form');
const imgUploadOverlay = uploadSelectImage.querySelector('.img-upload__overlay');
const imgUploadcancel = uploadSelectImage.querySelector('.img-upload__cancel');
const imgUploadSubmit = uploadSelectImage.querySelector('.img-upload__submit');
const textHashtags = uploadSelectImage.querySelector('.text__hashtags');
const textDescription = uploadSelectImage.querySelector('.text__description');
const imgUploadInput = uploadSelectImage.querySelector('.img-upload__input');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectNone = uploadSelectImage.querySelector('#effect-none');


// функция проверки формы
const pristine = new Pristine(uploadSelectImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});


// функция проверки комментария
function checkTextDescription(text) {
  return text.length <= DESCRIPTION_LENGTH;
}

// функция вывода ошибки комментария
function errorTextDescription() {
  return `Максимальная длина комментария ${DESCRIPTION_LENGTH} символов!`;
}


// функция блокировки кнопки
const blockSubmit = () => {
  imgUploadSubmit.disabled = true;
};

// функция разблокировки кнопки
const unblockSubmit = () => {
  imgUploadSubmit.disabled = false;
};


// функция проверки формы
const checkingForm = () => {
  const isValid = pristine.validate();
  if (isValid) {
    unblockSubmit();
  } else {
    blockSubmit();
  }
};

// функция отправки формы
const submitForm = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const formDate = new FormData(uploadSelectImage);
  blockSubmit();
  if (isValid) {
    sendData(
      () => {
        modalSucces();
        unblockSubmit();
        uploadSelectImage.reset();
      },
      modalError,
      formDate);
  }
};

const resetForm = () => {
  uploadSelectImage.reset();
  imgUploadInput.value = null;
  textDescription.value = '';
  textHashtags.value = '';
  scaleControlValue.value = '100%';
  effectNone.checked = true;
  pristine.reset();
};

// функция закрытия формы загрузки картинки
const uploadClose = () => {
  unblockSubmit();
  resetForm();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadSelectImage.removeEventListener('input', checkingForm);
  uploadSelectImage.removeEventListener('submit', submitForm);
};


// функция отслеживания нажатия Esc
const tracksEscKeystrokes = (evt) => {
  if (escTracking(evt)) {
    const modal = document.querySelector('.modal');
    if (document.activeElement !== textHashtags && document.activeElement !== textDescription && modal === null) {
      uploadClose();
      document.removeEventListener('keydown', tracksEscKeystrokes);
      uploadSelectImage.removeEventListener('submit', submitForm);
    }
  }
};


// функция открытия формы загрузки картинки
const uploadOpen = () => {
  createSlider();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', tracksEscKeystrokes);

  imgUploadcancel.addEventListener('click', () => {
    uploadClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
    uploadSelectImage.removeEventListener('submit', submitForm);
  });

  uploadSelectImage.addEventListener('input', checkingForm);
  uploadSelectImage.addEventListener('submit', submitForm);
};

pristine.addValidator(textDescription, checkTextDescription, errorTextDescription);
pristine.addValidator(textHashtags, checkingHashtag.checkTextHashtag, checkingHashtag.error);


const openForm = () => {
  uploadSelectImage.addEventListener('change', uploadOpen);
  imgUploadInput.addEventListener('input', loadImage);
};

export { uploadClose, tracksEscKeystrokes, unblockSubmit, openForm };

