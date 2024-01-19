// code base
const Joi = require("joi");

const validateRegister = Joi.object({
  fullname: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLaptop = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  brand: Joi.string().required(),
});

module.exports = { validateLaptop, validateLogin, validateRegister };
