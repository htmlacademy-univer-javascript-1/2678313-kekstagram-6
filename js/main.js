const NAMES = [
  'Ваня',
  'Гриша',
  'Мария',
  'Кристофор Колумб',
  'Роналдо',
  'Майкл Джексон',
  'Михаил Круг',
  'Алехандро',
];

const DESCRIPTIONS = [
  'Просто крутая фотка',
  'Здесь был Вася)',
  'Великолепные пейзажи',
  'Это что за чудо дивное',
  'Позвольте представить - Виктор',
  'Яблоки зеленые',
  'Небоскребы',
  'Великолепные виды',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_PHOTOS_COUNT = 25;

const createIdGenerator = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generateUrlId = createIdGenerator();

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => {
  const messages = [];
  for (let i = 0; i < getRandomInteger(1, 2); i++) {
    messages.push(getRandomArrayElement(MESSAGES));
  }
  return {
    id: generateCommentId(),
    avatar: `avatar-${getRandomInteger(1, 6)}.svg`,
    message: messages.join(' '),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment),

});

Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhoto);
