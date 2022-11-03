const express = require('express');
const router = express.Router();
const DrugController = require('../controller/DrugController');
router.post('/addmedicament',DrugController.adddrug);
//router.get('/getallspec',specialityController.getAllSpecialitiesPara)
//router.get('/getallback/:child',medicalbackController.getAllmedbackChild)
//router.get('/vaccines/:child',vaccineController.getal)
module.exports = router;