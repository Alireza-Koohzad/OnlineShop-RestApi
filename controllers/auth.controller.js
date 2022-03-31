const authService = require('../services/auth.service');
const cartService = require("../services/cart.service");
const {validationResult} = require('express-validator/check')
const User = require("../models/user");
const registerFlag = false;
const {transporter, mailOption} = require('../utils/nodeMailer-config');
const crypto = require('crypto');


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
        //create Cart for User
        await cartService.createCart(user);
        res.status(201).json({
            message: "create user successfully",
            user: user.id
        });
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

exports.getTest = (req, res, next) => {
    res.json({
        message: "you are test page  now !"
    })
}


exports.postResetPassword = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({where: {email: email}});
        if (!user) {
            const err = new Error("this Email is not exist!");
            err.statusCode = 404;
            throw err;
        }
        //generate emailToken
        crypto.randomBytes(32, async (err, buffer) => {
            const token = buffer.toString('hex');
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            await user.save();
            let htmlContent = `<p>You requested a password reset</p> <p>Click this <a href="http://localhost:3000/resetPassword/${token}">link</a> to set a new password.</p>`
            //send Email
            const result = await transporter.sendMail(mailOption(email, 'Reset your password', htmlContent));
            if (result) {
                res.status(201).json({
                    message: "send email successfully"
                })
            }
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getNewPassword = async (req, res, next) => {
    const token = req.params.token;
    try {
        const user = await User.findOne(
            {
                where: {
                    resetToken: token
                }
            })

        if (!user) {
            const err = new Error("this page not found");
            err.statusCode = 404;
            throw err;
        }
        res.json({
            message : "done"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}


exports.postNewPassword =async (req, res , next)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            const error = new Error('validation wrong');
            error.statusCode = 422;
            error.data = errors.array();
            throw  error;
        }
        const {newPassword , confirmPassword,token} = req.body
        const hashPassword = await authService.hashPassword(password);
        let user = User.findOne({where : {resetToken : token}});
        if(user){
           user.password = hashPassword;
           user.resetToken = undefined;
           await user.save();
           res.redirect('/login')
        }
    }catch (err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

