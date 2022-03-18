const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth');
const signupMiddleware = require('../middlewares/validation/signup.validation');
const loginMiddleware = require('../middlewares/validation/login.validation');

router.post('/signup' , signupMiddleware , authController.signup);

router.post('/login' , loginMiddleware , authController.login)

router.get('/test' , passport.authenticate('jwt', {session : false}) , authController.getTest);

module.exports = router;
