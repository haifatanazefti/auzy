const express = require('express');
const Answer = require('../models/Answer');
const TestAnswer = require('../models/TestAnswer');
const catchAsync = require('../utils/catchAsync')
var ObjectID = require('mongodb').ObjectID
exports.addtestAnswer = async (req, res) => {
    const savedtestAnswer = new TestAnswer({
        idTest:  req.params.idTest,
        idChild: req.params.idChild,
        isParent: req.body.isParent
    });
    try {
    const answerr = await savedtestAnswer.save();
        res.json(answerr);  
     }
        catch(err){
            res.json({message : err});
        } 
}

exports.addtestAnswerMchat = async (req, res) => {
    const savedtestAnswer = new TestAnswer({
        idTest: new ObjectID("62b0e3cd13eb22be22cf5524"),
        idChild: req.params.idChild,
        isParent: req.body.isParent
    });
    try {
    const answerr = await savedtestAnswer.save();
        res.json(answerr);  
     }
        catch(err){
            res.json({message : err});
        } 
}

exports.updateScore = catchAsync( async (req, res) => {
    const updatedscore = await TestAnswer.findOneAndUpdate({_id: req.params.id}
     , {$set: {
        score: req.body.score,
     } });
     if(updatedscore != null){
        res.json(updatedscore);
    }
    else {
        res.json("score not updated!")
    }
});

exports.getlastTestAns = catchAsync( async (req, res) => {
   
    const lasttest = await TestAnswer.find({idChild: req.params.idChild}).sort({date:-1}).limit(1);
    if(lasttest.length > 0){
        res.json(lasttest);
    }
    else {
        res.json("there is no consultation !! ")
    }

});

exports.deletetestanswer = catchAsync( async (req, res) => {
    
    const deletedtest = await TestAnswer.findByIdAndRemove(req.params.id)
    if(!deletedtest){
        res.json("test anwer not existant!!");
    }
    else 
    {  res.status(200).json({
        status: 'success',
        data: {
            deletedtest,
        },
      });
    }
  
});

exports.gethistroric = catchAsync( async (req, res) => {
    TestAnswer.aggregate([
        { $lookup:
           {
            from: "tests",
            localField: "idTest",
            foreignField: "_id",
            as: "test_det",
           }
         },
         {
            $match: {
                idChild: new ObjectID(req.params.idChild)
                      }
        },
        ])
        .then((result) => {
          if(result.length == 0){
            res.json("there is no test history!")
          }
          else {
            res.json(result);
          }
       
        })
        .catch((error) => {
          console.log(error);
        });
    
  });
  