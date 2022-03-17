const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.signup = async (email, password, username) => {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
        email: email,
        password: hashPassword,
        username: username
    });
    return user.save();
}


exports.findEmail = async (value) => {
    const email = await User.findOne({where: {email: value}});
    if (email) {
        return Promise.reject("email has already exist !")
    }
}


