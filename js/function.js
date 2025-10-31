const delayTime = 500;

// функция дебаунса
function debounce (callback, timeoutDelay = delayTime) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// функция коррекции значений
function corectValue (value) {
  if (Number.isInteger(value)) {
    return value.toFixed(0);
  }
  return value.toFixed(1);
}

// функция отслеживания нажатия Esc
function escTracking (evt) {
  return evt.key === 'Escape';
}


export { debounce, corectValue, escTracking };
