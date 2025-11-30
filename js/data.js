import {getRandomInteger, getRandomArrayElement, createIdGenerator} from './util.js';
import {NAMES, DESCRIPTIONS, MESSAGES, SIMILAR_PHOTOS_COUNT, AVATAR_MIN,
  AVATAR_MAX, COMMENT_MESSAGES_MIN, COMMENT_MESSAGES_MAX, LIKES_MIN,
  LIKES_MAX, COMMENTS_MIN, COMMENTS_MAX} from './constants.js';

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => {
  const messages = [];
  for (let i = 0; i < getRandomInteger(COMMENT_MESSAGES_MIN, COMMENT_MESSAGES_MAX); i++) {
    messages.push(getRandomArrayElement(MESSAGES));
  }
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
    message: messages.join(' '),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = () => {
  const id = generatePhotoId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: Array.from({length: getRandomInteger(COMMENTS_MIN, COMMENTS_MAX)}, createComment),
  };
};

export const getPosts = () => Array.from({length: SIMILAR_PHOTOS_COUNT}, createPhoto);
