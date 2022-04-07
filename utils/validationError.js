const {validationResult} = require("express-validator/check");
exports.checkValidationError = (req)=>{
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        const error = new Error('validation wrong');
        error.statusCode = 422;
        error.data = errors.array();
        throw  error;
    }
}