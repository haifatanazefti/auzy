const express = require('express');
const router = express.Router();
const fammedicalbackController = require('../controller/familymedbackController');
router.post('/addfammedback/:child',fammedicalbackController.addfamedback);
//router.get('/getallspec',specialityController.getAllSpecialitiesPara)
//router.get('/getallback/:child',medicalbackController.getAllmedbackChild)
router.get('/getallfam/:child',fammedicalbackController.getall)
module.exports = router;