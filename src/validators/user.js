const { body } = require("express-validator");

const registerUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("name can't be empty"),
  body("email")
    .notEmpty()
    .withMessage("email can't be empty")
    .isEmail()
    .withMessage("must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("password can't be empty")
];

const loginUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("email can't be empty")
    .isEmail()
    .withMessage("must be a valid email"),
  body("password")
    .notEmpty()
    .withMessage("password can't be empty")
];

module.exports = {
  registerUserValidator,
  loginUserValidator
};