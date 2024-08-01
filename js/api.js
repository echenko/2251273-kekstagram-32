const apiUrl = {
  GET: 'https://32.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://32.javascript.htmlacademy.pro /kekstagram',
};


const request = (onSuccess, onError, body, url, method) => {
  fetch(url, {
    method: method,
    credentials: 'same-origin',
    body: body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
};


const getData = (onSuccess, onError, body = null, url = apiUrl.GET, method = 'GET') => request(onSuccess, onError, body ,url, method);
const sendData = (onSuccess, onError, body = null, url = apiUrl.POST, method = 'POST') => request(onSuccess, onError, body, url, method);


export { getData, sendData };