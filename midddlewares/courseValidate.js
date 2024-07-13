const { check } = require('express-validator');

const courseValidationRules = () => {
  return [
    check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    check('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
    check('prerequisites').optional().isArray().withMessage('Prerequisites must be an array'),
    check('syllabus').isLength({ min: 10 }).withMessage('Syllabus must be at least 10 characters long'),
    check('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
    check('delivery_mode').isIn(['in-person', 'online', 'hybrid']).withMessage('Delivery mode must be one of: in-person, online, hybrid'),
    check('tuition_fee').isFloat({ min: 0 }).withMessage('Tuition fee must be a positive number')
  ];
};

module.exports = {
  courseValidationRules
};