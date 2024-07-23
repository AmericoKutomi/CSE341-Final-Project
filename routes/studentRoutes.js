const studentController = require('../controllers/studentController')
const router = require('express').Router()
const { studentValidationRules } = require('../middlewares/studentValidate')
const { isAuthenticated } = require('../middlewares/authMiddleware')

router.get("/", studentController.GetAllStudents)
router.get("/:id", studentController.GetSingle)
router.post("/", isAuthenticated, studentValidationRules(), studentController.AddStudent)
router.put("/:id", isAuthenticated, studentValidationRules(), studentController.UpdateStudent)
router.delete("/:id", studentController.DeleteStudent)
module.exports = router