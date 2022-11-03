const express = require('express');
const router = express.Router();
const QuestionController = require('../controller/QuestionController');
router.post('/addquestion',QuestionController.addQuestion);
router.post('/addquestionAng',QuestionController.addQuestionAng);
router.post('/addquestionFr',QuestionController.addQuestionFr);
router.post('/addquestionArb',QuestionController.addQuestionArb);
router.get('/questionsAng/:idTest',QuestionController.allQuestions)
router.get('/questionsAQ',QuestionController.allQuestionsAQ)
router.get('/questionsMchat',QuestionController.allQuestionsMchat)
module.exports = router;