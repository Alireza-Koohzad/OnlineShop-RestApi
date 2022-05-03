const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

module.exports = (passport) => {
    let opt = {};
    opt.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
    opt.secretOrKey = "alirezaShopProject";


    try {
        //create passport middleware to check authorization
        passport.use(new JwtStrategy(opt, async (jwt_payload, done) => {

            const user = await User.findOne({where: {id: jwt_payload.id}});

            if (!user) {
                done(null, false, {message: "not authentication"});
            } else {
                //add user to request
                // console.log(user)
                // req.user = user
                done(null, user)
            }
        }))
    } catch (err) {
        throw (err);
    }
}
