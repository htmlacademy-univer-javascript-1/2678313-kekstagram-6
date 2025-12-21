import {HASHTAG_MAX_COUNT, HASHTAG_MAX_LENGTH, COMMENT_MAX_LENGTH} from './constants.js';

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

  const hashtagRegex = /^#[A-Za-zА-Яа-яЁё0-9]+$/;

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
    return tags.every((t) => hashtagRegex.test(t) && t.length <= HASHTAG_MAX_LENGTH);
  };

  const validateHashtagUnique = (value) => {
    const tags = normalizeHashtags(value).map((t) => t.toLowerCase());
    const unique = new Set(tags);
    return unique.size === tags.length;
  };

  pristine.addValidator(hashtagsInput, validateHashtagCount, `Не более ${HASHTAG_MAX_COUNT} хэштегов`);
  pristine.addValidator(hashtagsInput, validateHashtagFormat, `Хэштег должен начинаться с # и содержать только буквы/цифры, макс ${HASHTAG_MAX_LENGTH} символов`);
  pristine.addValidator(hashtagsInput, validateHashtagUnique, 'Хэштеги не должны повторяться');

  const validateCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;
  pristine.addValidator(commentInput, validateCommentLength, `Комментарий не должен быть длиннее ${COMMENT_MAX_LENGTH} символов`);

  const stopEscPropagation = (evt) => {
    evt.stopPropagation();
  };

  const openOverlay = () => {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onModalCloseKeydown);
    cancelButton.addEventListener('click', onCancelClick);
    hashtagsInput.addEventListener('keydown', stopEscPropagation);
    commentInput.addEventListener('keydown', stopEscPropagation);
  };

  const closeOverlay = () => {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onModalCloseKeydown);
    cancelButton.removeEventListener('click', onCancelClick);
    hashtagsInput.removeEventListener('keydown', stopEscPropagation);
    commentInput.removeEventListener('keydown', stopEscPropagation);

    form.reset();
    fileInput.value = '';

    pristine.reset();
    submitButton.disabled = false;
  };

  function onModalCloseKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeOverlay();
    }
  }

  function onCancelClick(evt) {
    evt.preventDefault();
    closeOverlay();
  }

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      openOverlay();
    }
  });

  hashtagsInput.addEventListener('input', () => {
    pristine.validate(hashtagsInput);
  });

  commentInput.addEventListener('input', () => {
    pristine.validate(commentInput);
  });

  form.addEventListener('submit', (evt) => {
    const valid = pristine.validate();
    if (!valid) {
      evt.preventDefault();
      const firstError = form.querySelector('.pristine-error');
      firstError.scrollIntoView({block: 'center', behavior: 'smooth'});
    }
  });
}

export {initImageForm};
