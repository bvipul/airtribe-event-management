const { body } = require("express-validator");

const createEventValidator = [
  body("name")
    .notEmpty()
    .withMessage("name of the event is required"),
  body("city")
    .notEmpty()
    .withMessage("city is required"),
  body("address")
    .notEmpty()
    .withMessage("address is required"),
  body("maxPeople")
    .notEmpty()
    .withMessage("maxPeople is required")
    .isInt({ min: 1 })
    .withMessage("maxPeople must be a number and greater than 1")
    .toInt()
];

const updateEventValidator = [
  body("name")
    .optional(),
  body("city")
    .optional(),
  body("address")
    .optional(),
  body("maxPeople")
    .optional()
    .isInt({ min: 1 })
    .withMessage("maxPeople must be a number and greater than 1")
    .toInt()
];

module.exports = {
  createEventValidator,
  updateEventValidator
};