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
const {checkAuth, checkAuthUser, checkAuthAdmin} = require("../middlewares/is-auth.middleware");


//user
router.get('/user/get-all-products', userController.getAllProducts);
router.get('/user/get-category-product/:catId', userController.getCategoryProduct);
router.get('/user/edit-profile' , checkAuth , checkAuthUser , userController.getEditProfile);
router.put('/user/edit-profile' , checkAuth , checkAuthUser ,profileMiddleware  , userController.putProfile)
router.get('/user/filter-product' , userController.getFilterProduct);
router.get('/user/search' , userController.search)
//auth
router.post('/user/signup', signupMiddleware, authController.signup);
router.post('/user/login', loginMiddleware, authController.login)
router.post('/user/logout', checkAuth, checkAuthUser, authController.logout)
router.get('/user/test', checkAuth, checkAuthUser, authController.getTest);
router.get('/user/testAdmin', checkAuth, checkAuthAdmin, authController.getTestAdmin);

//admin auth
router.post('/admin/signup', signupMiddleware, authController.adminSignup);
router.post('/admin/login', loginMiddleware, authController.adminLogin);
router.post('/user/logout', checkAuth, checkAuthAdmin, authController.logout)

router.post('/admin/add-product', checkAuth, checkAuthAdmin, addProductMiddleware, adminController.addProduct);
router.put('/admin/edit-product/:prodId', checkAuth, checkAuthAdmin, addProductMiddleware, adminController.editProduct);
router.delete('/admin/delete-product', checkAuth, checkAuthAdmin, adminController.deleteProduct);
router.get('/admin/get-products', checkAuth, checkAuthAdmin, adminController.getProducts);
router.get('/admin/get-product/:prodId', checkAuth, checkAuthAdmin, adminController.getProducts);
router.get('/admin/get-orders', checkAuth, checkAuthAdmin, adminController.getOrders);
router.put('/admin/put-order/:orderId' , checkAuth , checkAuthAdmin , orderMiddleware , adminController.putOrder)

//reset password
router.post('/resetPassword', authController.postResetPassword);
router.get('/resetPassword/:token', authController.getNewPassword);
router.post('/newPassword', authController.getNewPassword);

//cart

router.get('/cart', checkAuth, checkAuthUser, cartController.getCart)
router.post('/cart', checkAuth, checkAuthUser, cartController.postCart);
router.delete('/delete-cart', checkAuth, checkAuthUser, cartController.deleteCart);


//order
router.get('/order', checkAuth, checkAuthUser, orderController.getOrder);
router.post('/createOrder', checkAuth, checkAuthUser, orderController.postOrder);


//payment
router.post('/payment', checkAuth, checkAuthUser, paymentController.postPayment);
router.get('/payment/returnPage', checkAuth, checkAuthUser, paymentController.paymentReturnPage);


module.exports = router;
