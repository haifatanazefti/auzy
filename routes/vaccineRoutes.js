const express = require('express');
const router = express.Router();
const vaccineController = require('../controller/vaccineController');
router.post('/addvaccine/:child',vaccineController.addvaccine);
//router.get('/getallspec',specialityController.getAllSpecialitiesPara)
//router.get('/getallback/:child',medicalbackController.getAllmedbackChild)
router.get('/vaccines/:child',vaccineController.getal)
module.exports = router;