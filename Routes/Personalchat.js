const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require('../Controller/personal_chat');
const login_authenticate = require('../Middleware/authorization')
router.post('/sendmessage',login_authenticate.authenticate,productsController.sendmessage);
router.post('/getmessage',login_authenticate.authenticate,productsController.getmessage);
router.post('/pictures',productsController.getpic)



module.exports=router;