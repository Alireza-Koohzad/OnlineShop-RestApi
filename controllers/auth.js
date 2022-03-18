const User = require('../models/user');
const authService = require('../services/auth');
const {validationResult} = require('express-validator/check')
const registerFlag = false;

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            const error = new Error('validation wrong');
            error.statusCode = 422;
            error.data = errors.array();
            throw  error;
        }
        const {email, password, username} = req.body;
        const user = await authService.signup(email, password, username);
        res.status(201).json({
            message: "create user successfully",
            user: user.id
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}


exports.login = async (req, res, next) => {
    try {
        //validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('validation wrong');
            error.statusCode = 422;
            error.data = errors.array();
            throw  error;
        }
        //extract body request
        const {email, password} = req.body;
        //check exist user (email)
        const user = await authService.findEmail(email, registerFlag);
        console.log(user.id)
        if (user) {
            //compare hash password
            await authService.comparePassword(user, password);
            //create jwt token
            const token = await authService.createJwtToken(user);
            res.status(200).json({
                token: token,
                userId: user.dataValues.id
            })
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getTest = (req, res , next) =>{
    res.json({
        message : "you are test page  now !"
    })
}

