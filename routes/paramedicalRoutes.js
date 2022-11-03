const express = require('express');
const router = express.Router();
const paraController = require('../controller/ParamedicalController');
router.get('/paraspec/:speciality',paraController.allPara)
router.get('/allpara',paraController.getparas)
router.post('/addpara',paraController.addParamedical)
router.get('/details/:id',paraController.getDetailsPara) 
router.delete('/supprimerpara/:id',paraController.trydeletepara)
router.get('/sumpara',paraController.sommepara)
router.post('/loginpara',paraController.loginParamedical)
router.patch('/updatepasswordpara/:id',paraController.updatepasswordpara)

router.post('/forgotPasswordPara', paraController.forgotPasswordPara);
router.post('/sendpasswordPara', paraController.sendpasswordPara);
router.patch('/resetPasswordPara/:token', paraController.resetPasswordPara);
router.patch('/updatepara/:id',paraController.updatePara);
module.exports = router;