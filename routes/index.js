const router = require('express').Router();
router.get('/', (req,res) =>{
    
    res.send("Hello World");
})

router.use('/teachers', require('./teacherRoutes'))
router.use('/courses', require('./courseRoutes'))

module.exports = router;