const { body } = require('express-validator')

const studentValidationRules = () => {
    return [
        body('first_name').trim().escape().notEmpty().isAlpha(),
        body('last_name').trim().escape().notEmpty().isAlpha(),
        body('email').trim().isEmail(),
        body('address').trim().notEmpty(),
        body('gender').trim().notEmpty().isAlpha(),
        body('birthdate').notEmpty().isISO8601().isDate().withMessage("Use the sintax yyyy-mm-dd"),
        body('phone_number').trim().isMobilePhone()
    ]
}
module.exports = { studentValidationRules }