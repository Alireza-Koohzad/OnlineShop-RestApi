const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/validation/signup.validation');

router.post('/signup' , authMiddleware , authController.signup);


module.exports = router;
