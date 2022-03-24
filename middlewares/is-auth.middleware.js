const passport = require("passport");


exports.checkUserAuth = (req , res , next) => {

    passport.authenticate('jwt', {session: false}, (err, user) => {
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'No jwt token'
            })
        }
        console.log("start : ")
        console.log(user )
        req.user = user
        return next()
    })(req, res, next)


}

