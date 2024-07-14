const express = require('express');
const Validator = require('../midddlewares/validate');
const { teacherValidationRules } = require('../midddlewares/teacherValidate');
const teacherController = require('../controllers/teacherController')
const {isAuthenticated} = require('../midddlewares/authMiddleware')

const router = express.Router();
router.get('/',isAuthenticated, teacherController.getAllTeacher);
router.post('/', isAuthenticated,
  Validator(teacherValidationRules()), 
teacherController.CreateTeacher
);
router.get('/:id',isAuthenticated, teacherController.getSingleTeacher)
router.put('/:id', Validator(teacherValidationRules),
teacherController.updateTeacher
);
router.delete('/:id',isAuthenticated, teacherController.deleteTeacher)
module.exports = router;