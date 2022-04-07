const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const paymentController = require('../controllers/payment.controller');
const adminController = require('../controllers/admin.controller');

const signupMiddleware = require('../middlewares/validation/signup.validation');
const loginMiddleware = require('../middlewares/validation/login.validation');
const  addProductMiddleware = require('../middlewares/validation/addProduct.validation');
const {checkAuth , checkAuthUser , checkAuthAdmin} = require("../middlewares/is-auth.middleware");


//user Auth
router.post('/signup' , signupMiddleware , authController.signup);

router.post('/login' , loginMiddleware , authController.login)
router.post('/logout' , checkAuth , checkAuthUser , authController.logout)
router.get('/test' , checkAuth , checkAuthUser  , authController.getTest);
router.get('/testAdmin' , checkAuth , checkAuthAdmin , authController.getTestAdmin);

//admin auth
router.post('/admin/signup' ,signupMiddleware  , authController.adminSignup);
router.post('/admin/login' , loginMiddleware , authController.adminLogin);

router.post('/admin/add-product' , checkAuth , checkAuthAdmin , addProductMiddleware ,adminController.addProduct );
router.put('/admin/edit-product/:prodId' , checkAuth , checkAuthAdmin , addProductMiddleware ,adminController.editProduct );


//reset password
router.post('/resetPassword' , authController.postResetPassword);
router.get('/resetPassword/:token' , authController.getNewPassword);
router.post('/newPassword' , authController.getNewPassword);

//cart

router.get('/cart' , checkAuth , checkAuthUser  , cartController.getCart)
router.post('/cart' , checkAuth , checkAuthUser , cartController.postCart);
router.delete('/delete-cart' , checkAuth , checkAuthUser  , cartController.deleteCart);


//order
router.get('/order' , checkAuth , checkAuthUser , orderController.getOrder);
router.post('/createOrder', checkAuth , checkAuthUser  , orderController.postOrder);


//payment
router.post('/payment' , checkAuth , checkAuthUser , paymentController.postPayment);
router.get('/payment/returnPage', checkAuth , checkAuthUser , paymentController.paymentReturnPage);


module.exports = router;
