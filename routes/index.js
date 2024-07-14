const router = require('express').Router();


router.use('/', require('./swagger'))
router.get('/', require('./static'))

router.use('/teachers', require('./teacherRoutes'))
router.use('/courses', require('./courseRoutes'))
router.use('/users', require('./userRoutes'))
router.use('/students', require('./studentRoutes'))

module.exports = router;