const express = require('express');
const router = express.Router();
const answerController = require('../controller/answerController');
router.post('/addAnswer',answerController.addAnswer);

module.exports = router;