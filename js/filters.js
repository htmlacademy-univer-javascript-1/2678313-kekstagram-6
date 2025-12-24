import { renderPictures } from './miniatures.js';
import { debounce } from './util.js';
import { RANDOM_COUNT } from './constants.js';

const Filter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');
const buttons = filtersForm.querySelectorAll('.img-filters__button');


const clearPictures = () => {
  document
    .querySelectorAll('.picture')
    .forEach((picture) => picture.remove());
};

const getRandomPictures = (pictures) =>
  [...pictures]
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_COUNT);


const getDiscussedPictures = (pictures) =>
  [...pictures].sort(
    (a, b) => b.comments.length - a.comments.length
  );

const applyFilter = (filterName, pictures) => {
  let filteredPictures = [];

  switch (filterName) {
    case Filter.RANDOM:
      filteredPictures = getRandomPictures(pictures);
      break;
    case Filter.DISCUSSED:
      filteredPictures = getDiscussedPictures(pictures);
      break;
    default:
      filteredPictures = pictures;
  }

  clearPictures();
  renderPictures(filteredPictures);
};

const debouncedApplyFilter = debounce(applyFilter);

const onFilterClick = (pictures) => (evt) => {

  buttons.forEach((button) =>
    button.classList.remove('img-filters__button--active')
  );

  evt.target.classList.add('img-filters__button--active');

  debouncedApplyFilter(evt.target.id, pictures);
};

const initFilters = (pictures) => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFilterClick(pictures));
};

export { initFilters };
