const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
router.post('/addadmin',adminController.addadmin);
router.post('/loginadmin',adminController.loginadmin);
router.get('/getadmin/:id',adminController.findAdmin);
/*router.post('/forgotPassword', adminController.forgotPassword);
router.patch('/resetPassword/:token', adminController.resetPassword);*/
//router.patch('/pass', adminController.newpassword);

module.exports = router;