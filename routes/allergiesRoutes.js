const express = require('express');
const router = express.Router();
const allergieController = require('../controller/allergiesController');
router.post('/addallergie/:child',allergieController.addallergie);
//router.get('/getallspec',specialityController.getAllSpecialitiesPara)
router.get('/getallallerg/:child',allergieController.getAllallergiesChild)
router.delete('/deleteallerg/:id',allergieController.deleteAllegry)

module.exports = router;