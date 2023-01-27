const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../Controller/adminControllers');
const login_authenticate = require('../Middleware/Authorization')


router.get("/list",login_authenticate.authenticate,adminController.groupFriends);
router.delete("/friends/remove", adminController.removeGroupUser);
router.post("/friends/add", adminController.addGroupUser);

router.put("/admin/modify/", adminController.adminModify);

module.exports = router;