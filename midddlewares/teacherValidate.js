const { check } = require('express-validator');

const teacherValidationRules = () => {
  return [
    check('_id').isMongoId().withMessage('Invalid ID format'),
    check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('email').isEmail().withMessage('Email is required'),
    check('phone_number').isInt({ min: 1 }).withMessage('Phone number is required'),
    check('qualification').isLength({ min: 5 }).withMessage('Qualification must be at least 5 characters long'),
    check('experience').isInt({ min: 1 }).withMessage('Experience must be a positive integer'),
    check('subjects_taught').isArray().withMessage('Subject_taught must be an array')
  ];
};

module.exports = {
  teacherValidationRules
};