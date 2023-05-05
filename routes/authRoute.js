const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const productController = require('../controllers/product');
const  loginSchema  = require('../models/loginSchema');

// routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
//router.get('/profile', verifyToken(), authController.getProfile);
//router.patch('/profile', [verifyToken(), profileSchema], authController.editProfile);



module.exports = router;