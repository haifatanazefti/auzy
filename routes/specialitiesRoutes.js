const express = require('express');
const router = express.Router();
const specialityController = require('../controller/specialityController');
router.post('/addspec',specialityController.addSpec);
router.get('/getallspec',specialityController.getAllSpecialitiesPara)
router.get('/getallsp',specialityController.getAllSpecialitiesmed)
module.exports = router;