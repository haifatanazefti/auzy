const express = require('express');
const router = express.Router();
const testController = require('../controller/testController');
router.post('/addtest',testController.addTest);
router.get('/tests',testController.getTests)
module.exports = router;