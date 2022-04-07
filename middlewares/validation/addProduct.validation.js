const {body} = require("express-validator/check");
const {isLength} = require("validator");

module.exports = [
    body('name')
        .isString()
        .isLength({min: 3 })
        .isAlphanumeric()
        .trim(),
    body('price')
        .isNumeric()
        .trim(),
    body('description')
        .isString()
        .isLength({max : 30})
        .trim()


]