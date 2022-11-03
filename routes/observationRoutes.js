const express = require('express');
const router = express.Router();
const observationController = require('../controller/ObservationController');
router.post('/addobser/:consultId',observationController.addObservations);
router.get('/getobserchild/:childId',observationController.getObservationChild)
module.exports = router;