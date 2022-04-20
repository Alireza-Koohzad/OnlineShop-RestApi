const {body} = require('express-validator/check');

module.exports = [
    body('payment_status')
        .not().isEmpty()
        .trim()
        .isBoolean()
        .withMessage("please enter valid payment_status. "),
    body('shipping_status')
        .isBoolean()
        .not().isEmpty()
        // .isLength({min: 6})
        .trim(),
]

