const { validationResult } = require("express-validator");
const { ValidationError } = require("../utils/custom-errors");

function validateRequestSchema (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    throw new ValidationError({
      message: errors.array()[0].msg,
      code: "VALIDATION_ERROR",
    });
  }
  next();
}

module.exports = validateRequestSchema;
