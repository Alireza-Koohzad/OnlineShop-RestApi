const userService = require('../services/user.service');

exports.getAllProducts = async (req, res, next) => {
    try {
        const data = await userService.getAllProducts();
        res.status(200).json({
            ...data,
            message: "get products successfully ",
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getCategoryProduct = async (req, res, next) => {
    try {
        const data = await userService.getCategoryProduct(req);
        res.status(200).json({
            ...data,
            message: "get products successfully ",
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


exports.getEditProfile = async (req, res, next) => {
    try {
        const user = await userService.getEditProfile(req)
        res.status(200).json({
            message: "get profile successfully",
            user: user,
            email: user.email
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.putProfile = async (req , res,  next)=>{
    try {
        const user = await userService.putProfile(req);
        res.status(200).json({
            message : "edit profile successfully",
            user : user,
            email : user.email,
            username : user.username
        })
    }catch (err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}