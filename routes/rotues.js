const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const signupMiddleware = require('../middlewares/validation/signup.validation');
const loginMiddleware = require('../middlewares/validation/login.validation');
const {checkUserAuth} = require("../middlewares/is-auth.middleware");




//user Auth
router.post('/signup' , signupMiddleware , authController.signup);

router.post('/login' , loginMiddleware , authController.login)

router.get('/test' , checkUserAuth , authController.getTest);


//cart

router.get('/cart' ,checkUserAuth , cartController.getCart)
router.post('/cart' , checkUserAuth , cartController.postCart);
router.delete('/delete-cart' , checkUserAuth , cartController.deleteCart);


//order
router.get('/order' , checkUserAuth , orderController.getOrder);
router.post('/createOrder', checkUserAuth , orderController.postOrder);


module.exports = router;
