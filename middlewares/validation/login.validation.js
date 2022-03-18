const {body} = require('express-validator/check');
// const authService = require('../../services/auth');

module.exports = [
    body('email')
        .normalizeEmail()
        .isEmail()
        .not().isEmpty()
        .trim()
        .withMessage("please enter valid email. "),
    body('password' , "please enter password contains only number and text at least 6 character")
        .isString()
        .isLength({min: 6})
        .isAlphanumeric()
        .trim(),
]

