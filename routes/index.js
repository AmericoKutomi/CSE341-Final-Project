const router = require('express').Router();
const passport = require('passport');


router.use('/', require('./swagger'))
// routes for public file
router.get('/', require('./static'))
// routes for teachers
router.use('/teachers', require('./teacherRoutes'))
router.use('/courses', require('./courseRoutes'))
router.use('/users', require('./userRoutes'))
router.get('/login', passport.authenticate('github', (req, res) =>{}))
router.get('/logout', function(req, res, next){
    req.logOut(function(err) {
        if(err){return next(err)}
        res.send('You are logout, type "localhost:8080/login" to log')
    })
})
module.exports = router;