import {HASHTAG_MAX_COUNT, HASHTAG_MAX_LENGTH, COMMENT_MAX_LENGTH, HASHTAGREGEX, FILE_TYPES} from './constants.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage, showLoadErrorMessage } from './util.js';

function initImageForm() {
  const form = document.querySelector('.img-upload__form');
  const fileInput = form.querySelector('.img-upload__input');
  const overlay = form.querySelector('.img-upload__overlay');
  const cancelButton = form.querySelector('#upload-cancel');
  const hashtagsInput = form.querySelector('.text__hashtags');
  const commentInput = form.querySelector('.text__description');
  const submitButton = form.querySelector('.img-upload__submit');

  const pristine = new window.Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'pristine-error',
  });

  const normalizeHashtags = (value) => {
    if (!value) {
      return [];
    }
    return value
      .trim()
      .split(/\s+/);
  };

  const validateHashtagCount = (value) => {
    const tags = normalizeHashtags(value);
    return tags.length <= HASHTAG_MAX_COUNT;
  };

  const validateHashtagFormat = (value) => {
    const tags = normalizeHashtags(value);
    return tags.every((t) => HASHTAGREGEX.test(t) && t.length <= HASHTAG_MAX_LENGTH);
  };

  const validateHashtagUnique = (value) => {
    const tags = normalizeHashtags(value).map((t) => t.toLowerCase());
    const unique = new Set(tags);
    return unique.size === tags.length;
  };

  pristine.addValidator(hashtagsInput, validateHashtagCount, `Не более ${HASHTAG_MAX_COUNT} хэштегов`, 3, true);
  pristine.addValidator(hashtagsInput, validateHashtagFormat, `Хэштег должен начинаться с # и содержать только буквы/цифры, макс ${HASHTAG_MAX_LENGTH} символов`, 2, true);
  pristine.addValidator(hashtagsInput, validateHashtagUnique, 'Хэштеги не должны повторяться', 1, true);

  const validateCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;
  pristine.addValidator(commentInput, validateCommentLength, `Комментарий не должен быть длиннее ${COMMENT_MAX_LENGTH} символов`);

  const stopEscPropagation = (evt) => {
    evt.stopPropagation();
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (!valid) {
      const firstError = form.querySelector('.pristine-error');
      firstError.scrollIntoView({block: 'center', behavior: 'smooth'});
    }

    submitButton.disabled = true;

    sendData(new FormData(form))
      .then(() => {
        closeOverlay();
        showSuccessMessage();
      })
      .catch((err) => {
        showErrorMessage(err.message);
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  };

  const previewImage = form.querySelector('.img-upload__preview img');
  const effectsPreviews = form.querySelectorAll('.effects__preview');

  const openOverlay = () => {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onModalCloseKeydown);
    cancelButton.addEventListener('click', onCancelClick);
    hashtagsInput.addEventListener('keydown', stopEscPropagation);
    commentInput.addEventListener('keydown', stopEscPropagation);
    form.addEventListener('submit', onFormSubmit);
  };

  function closeOverlay(){
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onModalCloseKeydown);
    cancelButton.removeEventListener('click', onCancelClick);
    hashtagsInput.removeEventListener('keydown', stopEscPropagation);
    commentInput.removeEventListener('keydown', stopEscPropagation);
    form.removeEventListener('submit', onFormSubmit);

    form.reset();
    fileInput.value = '';

    pristine.reset();
    submitButton.disabled = false;
  }

  function onModalCloseKeydown(evt) {
    if (evt.key === 'Escape') {
      if (document.querySelector('.error')) {
        return;
      }
      evt.preventDefault();
      closeOverlay();
    }
  }

  function onCancelClick(evt) {
    evt.preventDefault();
    closeOverlay();
  }

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      previewImage.src = imageUrl;
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${imageUrl})`;
      });
      openOverlay();
    } else {
      showLoadErrorMessage('Тип файла не поддерживается. Выберите изображение в формате JPG, JPEG или PNG.');
      fileInput.value = '';
    }
  });

  hashtagsInput.addEventListener('input', () => {
    pristine.validate(hashtagsInput);
  });

  commentInput.addEventListener('input', () => {
    pristine.validate(commentInput);
  });
}

export {initImageForm};
