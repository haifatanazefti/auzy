const express = require('express');
const router = express.Router();
const disordersController = require('../controller/disordersController');
router.post('/addD',disordersController.addDisordersTND);
router.get('/getdisorders',disordersController.getDisordersTND)
module.exports = router;