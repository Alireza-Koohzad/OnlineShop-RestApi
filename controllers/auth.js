const User = require('../models/user');
const authService = require('../services/auth');
const {validationResult} = require('express-validator/check')


exports.signup = async (req, res, next) => {
    console.log("hello1")
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            const error = new Error('validation wrong');
            error.statusCode = 422;
            error.data = errors.array();
            throw  error;
        }
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        console.log("hello2")

        const user = await authService.signup(email, password, username);
        res.status(201).json({
            message: "create user successfully",
            user: user.id
        })
    } catch (err) {
        console.log("hello3")

        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

