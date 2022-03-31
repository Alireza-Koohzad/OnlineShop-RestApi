const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (email, password, username) => {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
        email: email,
        password: hashPassword,
        username: username
    });
    return user.save();
}

exports.hashPassword = async (password )=>{
    return  await bcrypt.hash(password, 12);

}


exports.findEmail = async (email, registerFlag) => {
    const user = await User.findOne({where: {email: email}});
    //user exists and we are in  register step
    if (user && registerFlag) {
        return Promise.reject("email has already exist !")
    }
    // user does non exist and we are in login step
    else if (!user && !registerFlag) {
        const error = new Error("this email is not found")
        error.statusCode = 401;
        throw error
    }

    return user
}

exports.comparePassword = async (user, password) => {
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        const error = new Error("password is incorrect")
        error.statusCode = 401;
        throw error
    }
}

exports.createJwtToken = async (user) => {
    const jwt_payload = {
        id: user.id,
        email: user.email
    }
    const token = jwt.sign(
        jwt_payload,
        'alirezaShopProject',
        {expiresIn: '3h'}
    );
    return token;
}


