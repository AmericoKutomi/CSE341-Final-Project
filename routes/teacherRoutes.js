const express = require('express');
const Validator = require('../middlewares/validate');
const { teacherValidationRules } = require('../middlewares/teacherValidate');
const teacherController = require('../controllers/teacherController')
const {isAuthenticated} = require('../middlewares/authMiddleware')

const router = express.Router();
router.get('/',isAuthenticated, teacherController.getAllTeacher);
router.post('/', isAuthenticated,
  Validator(teacherValidationRules()), 
teacherController.CreateTeacher
);
router.get('/:id',isAuthenticated, teacherController.getSingleTeacher)
router.put('/:id', Validator(teacherValidationRules()),
teacherController.updateTeacher
);
router.delete('/:id',isAuthenticated, teacherController.deleteTeacher)
module.exports = router;