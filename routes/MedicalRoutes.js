const express = require('express');
const router = express.Router();
const doctorController = require('../controller/MedicalController');
router.get('/listdoctor',doctorController.getAll)
router.post('/addoc',doctorController.addDoctor)
router.get('/getpedopsy/:adress',doctorController.getAllPedopsy)
router.get('/getdoc/:speciality',doctorController.getdoctor)
router.get('/getdetailss/:id',doctorController.getDetails) // details matekhdemsh khater zedet id
router.get('/getdetails/:id',doctorController.try)
router.delete('/supprimer/:id',doctorController.trydelete)
router.get('/search/:key',doctorController.searchDoctor)
router.get('/alldoct/:speciality',doctorController.alldoctors)
router.get('/topdoc',doctorController.topdoc)
router.get('/sum',doctorController.somme)
router.post('/logindoctor',doctorController.loginMedical)
router.post('/forgotPasswordMed', doctorController.forgotPasswordMed);
router.patch('/resetPasswordMed/:token', doctorController.resetPasswordMed);
router.post('/sendpasswordMed', doctorController.sendpasswordMed);
router.patch('/updatemed/:id',doctorController.updateMed);
module.exports = router;
