const express = require('express');
const router = express.Router();
const medicalbackController = require('../controller/medicalbackController');
router.post('/addmedback/:child',medicalbackController.addmedback);
//router.get('/getallspec',specialityController.getAllSpecialitiesPara)
router.get('/getallback/:child',medicalbackController.getAllmedbackChild)
module.exports = router;