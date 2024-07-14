const { body } = require('express-validator')

const studentValidationRules = () => {
    return [
        body('first_name').trim().escape().notEmpty().isAlpha(),
        body('last_name').trim().escape().notEmpty().isAlpha(),
        body('email').trim().isEmail(),
        body('address').trim().notEmpty(),
        body('gender').trim().notEmpty().isAlpha(),
        body('birthdate').trim().notEmpty().isDate(),
        body('phone_number').trim().isMobilePhone()
    ]
}
module.exports = { studentValidationRules }