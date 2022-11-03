const express = require('express');
const router = express.Router();
const MoodlogController = require('../controller/MoodlogController');
router.post('/addmood/:childId',MoodlogController.addMoodLog)
router.get('/getmoods/:childId',MoodlogController.getMoods)
router.get('/getmoodoneday/:childId',MoodlogController.getMoodoneday)
router.patch('/updateMood/:id',MoodlogController.updateMood)
router.get('/detailsmood/:childId/:date',MoodlogController.detailMoodlog)
router.delete('/deletemood/:id',MoodlogController.deletemood)
module.exports = router;