function initBigPicture(posts) {
  const picturesContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const bigImg = bigPicture.querySelector('img');
  const likesCountEl = bigPicture.querySelector('.likes-count');
  const commentsCountEl = bigPicture.querySelector('.comments-count');
  const socialCommentsEl = bigPicture.querySelector('.social__comments');
  const socialCaptionEl = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const closeSelectors = bigPicture.querySelector('.big-picture__cancel');


  function onModalCloseKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  }

  function onCloseClick(evt) {
    evt.preventDefault();
    closeModal();
  }

  function createCommentElement(comment) {
    const li = document.createElement('li');
    li.className = 'social__comment';

    const img = document.createElement('img');
    img.className = 'social__picture';
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.className = 'social__text';
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);

    return li;
  }

  const openModal = (post) => {
    bigImg.src = post.url;
    bigImg.alt = post.description;

    likesCountEl.textContent = String(post.likes);
    commentsCountEl.textContent = String(post.comments.length);
    socialCaptionEl.textContent = post.description;
    socialCommentsEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    (post.comments).forEach((c) => {
      fragment.appendChild(createCommentElement(c));
    });
    socialCommentsEl.appendChild(fragment);

    commentCountBlock.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onModalCloseKeydown);
    closeSelectors.addEventListener('click', onCloseClick);
  };

  function closeModal(){
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onModalCloseKeydown);
    closeSelectors.removeEventListener('click', onCloseClick);

    commentCountBlock.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  }

  picturesContainer.addEventListener('click', (evt) => {
    const pictureCurrent = evt.target.closest('.picture');
    const postId = Number(pictureCurrent.dataset.postId);
    const post = posts.find((p) => p.id === postId);
    evt.preventDefault();
    openModal(post);
  });
}

export {initBigPicture};
