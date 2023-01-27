const express = require('express');
const router = express.Router();
const path = require('path');
const FriendsController = require('../Controller/FriendsControllers');
const login_authenticate = require('../Middleware/Authorization')

router.get('/listfriends',login_authenticate.authenticate,FriendsController.listfriends);



module.exports=router;