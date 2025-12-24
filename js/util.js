import {ALERT_SHOW_TIME} from './constants.js';

const createIdGenerator = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  const message = template.querySelector('.error');

  document.body.append(message);

  const close = () => {
    message.remove();
    document.removeEventListener('keydown', onEsc);

    document.dispatchEvent(new CustomEvent('error-closed')); // не уверен, что так можно, но другое в голову не пришло))
  };

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      close();
    }
  }

  message.addEventListener('click', (evt) => {
    if (evt.target.closest('.error__inner')) {
      return;
    }
    close();
  });

  message.querySelector('.error__button').addEventListener('click', close);
  document.addEventListener('keydown', onEsc);
};


const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  const message = template.querySelector('.success');

  document.body.append(message);

  const close = () => {
    message.remove();
    document.removeEventListener('keydown', onEsc);
  };

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      close();
    }
  }

  message.addEventListener('click', (evt) => {
    if (evt.target.closest('.success__inner')) {
      return;
    }
    close();
  });

  message.querySelector('.success__button').addEventListener('click', close);
  document.addEventListener('keydown', onEsc);
};

const showLoadErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {createIdGenerator, getRandomInteger, getRandomArrayElement, showErrorMessage, showSuccessMessage, showLoadErrorMessage};
