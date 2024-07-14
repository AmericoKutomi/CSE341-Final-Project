const express = require('express');
const Validator = require('../midddlewares/validate');
const { courseValidationRules } = require('../midddlewares/courseValidate');
const courseController = require('../controllers/courseController')

const router = express.Router();

router.get('/', isAuthenticated, courseController.getAllCourse);

router.post('/', isAuthenticated, Validator(courseValidationRules()), courseController.createCourse);

router.get('/:id', isAuthenticated, courseController.getSingleCourse);

router.put('/:id', isAuthenticated, Validator(courseValidationRules),courseController.updateCourse);

router.delete('/:id', isAuthenticated, courseController.deleteCourse);

module.exports = router;


