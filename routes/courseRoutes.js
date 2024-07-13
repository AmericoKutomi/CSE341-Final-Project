const express = require('express');
const Validator = require('../midddlewares/validate');
const { courseValidationRules } = require('../midddlewares/courseValidate');
const courseController = require('../controllers/courseController')

const router = express.Router();

router.get('/', courseController.getAllCourse);

router.post('/', Validator(courseValidationRules()), courseController.createCourse);

router.get('/:id', courseController.getSingleCourse);

router.put('/:id', Validator(courseValidationRules),courseController.updateCourse);

router.delete('/:id', courseController.deleteCourse);

module.exports = router;


