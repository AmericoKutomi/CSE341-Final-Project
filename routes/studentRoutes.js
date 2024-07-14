const studentController = require('../controllers/studentController')
const router = require('express').Router()

router.get("/", studentController.GetAllStudents)
router.get("/:id", studentController.GetSingle)
router.post("/", studentController.AddStudent)
router.put("/:id", studentController.UpdateStudent)
router.delete(":/", studentController.DeleteStudent)
module.exports = router