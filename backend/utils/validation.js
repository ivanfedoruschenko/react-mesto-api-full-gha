const { celebrate, Joi } = require('celebrate');
/* eslint-disable */
const regex = /^(http|https):\/\/(www\.)?[a-zA-Z0-9\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=]{1,256}\.[a-zA-Z0-9\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=]{2,}/;

const validationGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});

const validationDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validationDislikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required(),
  }),
});

const validationLikeCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validationGetUserById,
  validationUpdateUser,
  validationUpdateAvatar,
  validationCreateCard,
  validationDeleteCard,
  validationDislikeCard,
  validationLikeCard,
  validationCreateUser,
  validationLogin,
};
