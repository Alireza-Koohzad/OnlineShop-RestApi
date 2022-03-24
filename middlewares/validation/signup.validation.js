const {body} = require('express-validator/check');
const authService = require('../../services/auth.service');

module.exports = [
    body('username')
        .isString()
        .not().isEmpty()
        // .isLength({min: 6})
        .trim(),

    body('email')
        .normalizeEmail()
        .isEmail()
        .not().isEmpty()
        .trim()
        .withMessage("please enter valid email. ")
        .custom((value, {req}) => {
            return authService.findEmail(value,true);
        }),
    body('password' , "please enter password contains only number and text at least 6 character")
        .isString()
        .isLength({min: 6})
        .isAlphanumeric()
        .trim(),

    body('confirmPassword')
        .trim()
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw Error("confirm password must be equal with password");
            }
            return true;
        })
]

