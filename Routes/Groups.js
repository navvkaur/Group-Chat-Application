const express = require('express');
const router = express.Router();
const path = require('path');
const profileController = require('../Controller/groupControllers');
const login_authenticate = require('../Middleware/Authorization')

router.post('/addgroup',login_authenticate.authenticate,profileController.addgroup);
router.get('/getgroup',login_authenticate.authenticate,profileController.getgroup);
router.post('/getgroupmembers',login_authenticate.authenticate,profileController.getgroupmembers);
router.post('/group/sendmessage',login_authenticate.authenticate,profileController.sendgroupmessage);
router.post('/group/getmessage',login_authenticate.authenticate,profileController.getgroupmessage);





module.exports=router;