const express = require('express');
const router = express.Router();
const chronicController = require('../controller/chronicController');
router.post('/addch',chronicController.addchronic);
router.get('/getchronics',chronicController.getchronics)
module.exports = router;