const express = require('express');
const router = express.Router();
const surgicalController = require('../controller/SurgicalController');
router.post('/addsurgback/:child',surgicalController.addsurgback);
//router.get('/getallspec',specialityController.getAllSpecialitiesPara)
//router.get('/getallback/:child',medicalbackController.getAllmedbackChild)
router.get('/surg/:child',surgicalController.getalll)
module.exports = router;