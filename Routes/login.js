const express = require('express');
const router = express.Router();
const path = require('path');
const loginController = require('../Controller/loginController');
const login_authenticate = require('../Middleware/Authorization')

router.post('/login/sign-in',loginController.signin);
router.post('/login',loginController.login);
router.post('/editprofile',login_authenticate.authenticate,loginController.editprofile)


module.exports=router;