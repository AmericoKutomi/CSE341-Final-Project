// validate.js
const { check, validationResult } = require('express-validator');

const Validator = (validations) => {
  return async (req, res, next) => {
    // await Promise.all(validations);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};

module.exports = Validator;