const {body} = require("express-validator/check");
module.exports = [
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