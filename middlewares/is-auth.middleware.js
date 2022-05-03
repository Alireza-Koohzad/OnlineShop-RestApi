const passport = require("passport");

module.exports = {
    checkAuth: (req, res, next) => {
        passport.authenticate('jwt', {session: false}, (err, user) => {
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'No jwt token'
                })
            }


            req.user = user
            return next()
        })(req, res, next)
    },
    checkAuthAdmin: (req, res, next) => {
        if (req.user && req.session.adminToken) {
            if (req.user.role === 'admin') {
                return next()
            }
            return res.json({status: 'error', message: 'permission denied'})
        } else {
            return res.json({status: 'error', message: 'permission denied'})
        }
    },
    checkAuthUser: (req, res, next) => {
        if (req.user && req.session.userToken) {
            if (req.user.role === 'user') {
                return next()
            }
            return res.json({status: 'error', message: 'permission denied'})
        } else {
            return res.json({status: 'error', message: 'permission denied'})
        }
    },
    checkIsLoggedIn :   (req, res, next) =>{
        if (req.isAuthenticated())
            return next();
    }
}




