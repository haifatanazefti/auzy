const express = require('express');
const router = express.Router();
const MoodLog = require('../models/MoodLog')
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync')


exports.getMoods = catchAsync(async (req, res) => {
        const moodlogs = await MoodLog.find({childId: req.params.childId });
        if(moodlogs.length == 0){
            res.json("no mood logs for this child!!");
        }
        else 
        { res.json(moodlogs)
        }
    
});

exports.addMoodLog = async (req, res) => {
    const moodLog = new MoodLog({
        // ynajam yzid te3 lyoum wala  f date fetet
        date: req.body.date,
        type: req.body.type,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        trigger: req.body.trigger,
        reaction: req.body.reaction,
        background: req.body.background,
        audio: req.body.audio,
        video: req.body.video,
        childId: req.params.childId
    });
    try {
    const savedMood = await moodLog.save();
        res.json(savedMood); 
        console.log(savedMood);  
    }
        catch(err){
            res.json({message : err});
        } 
}

exports.getMoodoneday = catchAsync(async (req, res) => {
    
        const moodday = await MoodLog.find({date: req.body.date, childId: req.params.childId });
        res.json(moodday);
});

exports.updateMood = catchAsync(async (req, res) => {
    const updatedMood = await MoodLog.updateOne({_id: req.params.id}
     , {$set: {
        trigger : req.body.trigger
     } });
     res.status(200).json({
        status: 'success',
        data: {
            updatedMood,
        },
      });
});

exports.detailMoodlog = catchAsync( async (req, res) => {
    const moodlog = await MoodLog.find(
        { childId: req.params.childId, 
        date: req.params.date }
        ).sort({starttime:1});
    if(moodlog.length>0){
        res.json(moodlog);
    }
    else {
        res.json("there is no moodlog")
    }
    

});

exports.deletemood = catchAsync( async (req, res) => {
    
    const deletedMood= await MoodLog.findByIdAndRemove(req.params.id)
    if(!deletedMood){
        res.json("mood log not existant!!");
    }
    else 
    {  res.status(200).json({
        status: 'success',
        data: {
            deletedAllergy,
        },
      });
    }
  
});
