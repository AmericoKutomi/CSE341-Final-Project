const express = require('express');
const Validator = require('../middlewares/validate');
const { courseValidationRules } = require('../middlewares/courseValidate');
const courseController = require('../controllers/courseController')
const {isAuthenticated} = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/', isAuthenticated, courseController.getAllCourse);

router.post('/', isAuthenticated, Validator(courseValidationRules()), courseController.createCourse);

router.get('/:id', isAuthenticated, courseController.getSingleCourse);

router.put('/:id', isAuthenticated, Validator(courseValidationRules()),courseController.updateCourse);

router.delete('/:id', isAuthenticated, courseController.deleteCourse);

module.exports = router;


