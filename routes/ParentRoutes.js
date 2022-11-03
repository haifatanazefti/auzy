const express = require('express');
const router = express.Router();
const parentController = require('../controller/parentController');
router.post('/addparent',parentController.addParent)
router.get('/parents',parentController.getParents)
router.get('/getadress/:id',parentController.getParentAdress)
router.get('/getparent/:id',parentController.getParent)
router.delete('/deluser/:id',parentController.deleteuser)
router.get('/sumusers',parentController.somme)
router.post('/loginparent',parentController.loginParent)
router.patch('/updateparent/:id',parentController.updateParent)
router.patch('/updatepasswordparent/:id',parentController.updatepassword)
router.post('/forgotPasswordP', parentController.forgotPasswordP);
router.post('/sendpassword', parentController.sendpassword);
router.patch('/resetPasswordP/:token', parentController.resetPassword);
module.exports = router;