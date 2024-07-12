const express = require('express');
const Validator = require('../midddlewares/validate');
const { teacherValidationRules } = require('../midddlewares/teacherValidate');
const teacherController = require('../controllers/teacherController')

const router = express.Router();
router.get('/', teacherController.getAllTeacher);
router.post('/', 
  Validator(teacherValidationRules()), 
teacherController.CreateTeacher
);
router.get('/:id', teacherController.getSingleTeacher)
router.put('/:id', Validator(teacherValidationRules),
teacherController.updateTeacher
);
router.delete('/:id', teacherController.deleteTeacher)
module.exports = router;