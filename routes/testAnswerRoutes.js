const express = require('express');
const router = express.Router();
const testAnswerController = require('../controller/testAnswerController');
router.post('/addtestanswer/:idChild/:idTest',testAnswerController.addtestAnswer);
router.patch('/updatescoree/:id', testAnswerController.updateScore)
router.get('/getlast/:idChild',testAnswerController.getlastTestAns);
router.delete('/deletetestans/:id',testAnswerController.deletetestanswer)
router.get('/history/:idChild',testAnswerController.gethistroric)
module.exports = router;