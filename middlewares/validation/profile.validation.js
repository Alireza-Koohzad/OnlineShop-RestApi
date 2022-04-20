const {body} = require('express-validator/check');

module.exports = [
    body('email')
        .normalizeEmail()
        .isEmail()
        .not().isEmpty()
        .trim()
        .withMessage("please enter valid email. "),
    body('username')
        .isString()
        .not().isEmpty()
        // .isLength({min: 6})
        .trim(),
]

