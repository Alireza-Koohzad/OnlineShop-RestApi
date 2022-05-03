const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const paymentController = require('../controllers/payment.controller');
const adminController = require('../controllers/admin.controller');
const userController = require('../controllers/user.controller');

const signupMiddleware = require('../middlewares/validation/signup.validation');
const loginMiddleware = require('../middlewares/validation/login.validation');
const addProductMiddleware = require('../middlewares/validation/addProduct.validation');
const profileMiddleware = require('../middlewares/validation/profile.validation');
const orderMiddleware = require('../middlewares/validation/order.validation');

const {checkAuth, checkAuthUser, checkAuthAdmin, checkIsLoggedIn} = require("../middlewares/is-auth.middleware");


//user
router.get('/user/get-all-products', userController.getAllProducts); //ok
router.get('/user/get-category-product/:catId', userController.getCategoryProduct);
router.get('/user/edit-profile' , checkAuth , checkAuthUser , userController.getEditProfile); //ok
router.put('/user/edit-profile' , checkAuth , checkAuthUser ,profileMiddleware  , userController.putProfile) //ok
router.get('/user/filter-product' , userController.getFilterProduct);    //ok but  imperfect!!
router.get('/user/search' , userController.search);     //ok but should be full text search

//auth
router.post('/user/signup', signupMiddleware, authController.signup); //ok
router.post('/user/login', loginMiddleware  , authController.login) //no
router.post('/user/logout', checkAuth, checkAuthUser, authController.userLogout); //no
router.get('/user/test', checkAuth, checkAuthUser, authController.getTest); //ok

//admin auth
router.post('/admin/signup', signupMiddleware, authController.adminSignup); //ok
router.post('/admin/login', loginMiddleware, authController.adminLogin); // ok
router.post('/admin/logout', checkAuth, checkAuthAdmin, authController.adminLogout) //ok
router.get('/admin/testAdmin', checkAuth, checkAuthAdmin, authController.getTestAdmin); //ok

router.post('/admin/add-product', checkAuth, checkAuthAdmin, addProductMiddleware, adminController.addProduct); //ok
router.put('/admin/edit-product/:prodId', checkAuth, checkAuthAdmin, addProductMiddleware, adminController.editProduct); //ok
router.delete('/admin/delete-product', checkAuth, checkAuthAdmin, adminController.deleteProduct); //ok
router.get('/admin/get-products', checkAuth, checkAuthAdmin, adminController.getProducts); //ok
router.get('/admin/get-product/:prodId', checkAuth, checkAuthAdmin, adminController.getProduct); //ok
router.get('/admin/get-orders', checkAuth, checkAuthAdmin, adminController.getOrders); //ok
router.put('/admin/put-order/:orderId' , checkAuth , checkAuthAdmin , orderMiddleware , adminController.putOrder) //ok

//reset password
router.post('/resetPassword', authController.postResetPassword); //ok
router.get('/resetPassword/:token', authController.getNewPassword); //ok
router.post('/newPassword', authController.getNewPassword); //ok

//cart

router.get('/user/cart', checkAuth, checkAuthUser, cartController.getCart) //ok
router.post('/user/cart', checkAuth, checkAuthUser, cartController.postCart); //ok
router.delete('/user/delete-cart', checkAuth, checkAuthUser, cartController.deleteCart); //ok


//order
router.get('/order', checkAuth, checkAuthUser, orderController.getOrder); //ok
router.post('/create-order', checkAuth, checkAuthUser, orderController.postOrder); //ok


//payment
router.post('/payment', checkAuth, checkAuthUser, paymentController.postPayment); //ok
router.get('/payment/returnPage', paymentController.paymentReturnPage); //ok


module.exports = router;
