const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const paymentController = require('../controllers/payment.controller');
const signupMiddleware = require('../middlewares/validation/signup.validation');
const loginMiddleware = require('../middlewares/validation/login.validation');
const {checkUserAuth} = require("../middlewares/is-auth.middleware");




//user Auth
router.post('/signup' , signupMiddleware , authController.signup);

router.post('/login' , loginMiddleware , authController.login)

router.get('/test' , checkUserAuth , authController.getTest);

router.post('/resetPassword' , authController.postResetPassword);
router.get('/resetPassword/:token' , authController.getNewPassword)
router.post('/newPassword' , authController.getNewPassword)

//cart

router.get('/cart' ,checkUserAuth , cartController.getCart)
router.post('/cart' , checkUserAuth , cartController.postCart);
router.delete('/delete-cart' , checkUserAuth , cartController.deleteCart);


//order
router.get('/order' , checkUserAuth , orderController.getOrder);
router.post('/createOrder', checkUserAuth , orderController.postOrder);


//payment
router.post('/payment' , checkUserAuth , paymentController.postPayment);
router.get('/payment/returnPage' , checkUserAuth , paymentController.paymentReturnPage);


module.exports = router;
