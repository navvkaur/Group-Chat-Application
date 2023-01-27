const express = require('express');

const resetpasswordController = require('../Controller/forgot_passwordController.js');


const router = express.Router();

 router.post('/password/forgotpassword', resetpasswordController.forgotpassword)

  router.post('/password/resetpassword/:id', resetpasswordController.resetpassword)

module.exports = router;