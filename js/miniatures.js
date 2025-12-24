const renderPictures = (posts) => {
  const template = document.querySelector('#picture').content;
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  const filters = document.querySelector('.img-filters');

  posts.forEach((post) => {
    const pictureElement = template.querySelector('.picture').cloneNode(true);
    pictureElement.dataset.postId = post.id;

    const img = pictureElement.querySelector('.picture__img');
    const likesCount = pictureElement.querySelector('.picture__likes');
    const commentsCount = pictureElement.querySelector('.picture__comments');

    img.src = post.url;
    img.alt = post.description;
    likesCount.textContent = post.likes;
    commentsCount.textContent = post.comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
  filters.classList.remove('img-filters--inactive');
};

export {renderPictures};
