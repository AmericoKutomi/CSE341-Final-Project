const studentController = require('../controllers/studentController')
const router = require('express').Router()
const { studentValidationRules } = require('../midddlewares/studentValidate')
router.get("/", studentController.GetAllStudents)
router.get("/:id", studentController.GetSingle)
router.post("/", studentValidationRules(), studentController.AddStudent)
router.put("/:id", studentValidationRules(), studentController.UpdateStudent)
router.delete("/:id", studentController.DeleteStudent)
module.exports = router