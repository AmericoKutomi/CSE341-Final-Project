const express = require('express');
const Validator = require('../midddlewares/validate');
const { courseValidationRules } = require('../midddlewares/courseValidate');

const router = express.Router();

router.post('/', 
  Validator(courseValidationRules()), 
  (req, res) => {
    // Handle the request
    res.send('Course created successfully');
  }
);

module.exports = router;