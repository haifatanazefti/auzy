const express = require('express');

const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const Availablity = require('../models/Availablity')
const mongoose = require('mongoose');
const Test = require('../models/Test');
const Question = require('../models/Question');
const QuestionAng = require('../models/QuestionAng');
const QuestionFr = require('../models/QuestionFr');
const QuestionAr = require('../models/QuestionAr');
var ObjectID = require('mongodb').ObjectID
let ts = Date.now();
exports.addQuestion = async (req, res) => {
    const question = new Question({
        order: req.body.order,
        idTest: req.body.idTest,
    });
    try {
        const questExists = await Question.exists({ order: req.body.order,  idTest: req.body.idTest});
            if(questExists)

                 {res.status(400).send('order exist!!');}

            else {
                const savequest = await question.save();
                res.json(savequest['id']);   
     }
    }
        catch(err){
            res.json({message : err});
        } 
}

exports.addQuestionAng = async (req, res) => {
    const questionang = new QuestionAng({
        Text: req.body.Text,
        idquestion: req.body.idquestion,
    });
    try {
        
    const savequest = await questionang.save();
    res.status(200).json({
        status: 'success',
        data: {
            savequest,
        },
      });
     }
      
        catch(err){
            res.json({message : err});
        } 
}

exports.addQuestionFr = async (req, res) => {
    const questionfr = new QuestionFr({
        Text: req.body.Text,
        idquestion: req.body.idquestion,
    });
    try {
    const savequest = await questionfr.save();
         res.status(200).send('succes');   
     }
      
        catch(err){
            res.json({message : err});
        } 
}

exports.addQuestionArb = async (req, res) => {
    const questionarb = new QuestionAr({
        Text: req.body.Text,
        idquestion: req.body.idquestion,
    });
    try {
    const savequest = await questionarb.save();
         res.status(200).send('succes');   
     }
      
        catch(err){
            res.json({message : err});
        } 
}

exports.allQuestions = catchAsync( async (req, res) => {
     Question.aggregate([
         {$match : { "idTest" : new ObjectID(req.params.idTest)}},
         { $lookup:
            {
             from: "questionangs",
             localField: "_id",
             foreignField: "idquestion",
             as : "details"  }}
          
       //  { $project: { 'speciality_Doctor.Name': 1 } },
         ])
         .then((result) => {
             if(result.length == 0){
                 res.json("there is no doctors")
             }
             else {
                 res.json(result);
             }
         })
         .catch((error) => {
           console.log(error);
         });
 });


 exports.allQuestionsAQ = catchAsync( async (req, res) => {
    Question.aggregate([
        {$match : { "idTest" : new ObjectID("62b0448848726aa209e1c417")}},
        { $lookup:
           {
            from: "questionangs",
            localField: "_id",
            foreignField: "idquestion",
            as : "details"  }}
         
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ]).sort({order:1})
        .then((result) => {
            if(result.length == 0){
                res.json("there is no doctors")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

exports.allQuestionsMchat = catchAsync( async (req, res) => {
    Question.aggregate([
        {$match : { "idTest" : new ObjectID("62b0e3cd13eb22be22cf5524")}},
        { $lookup:
           {
            from: "questionangs",
            localField: "_id",
            foreignField: "idquestion",
            as : "details"  }}
         
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ]).sort({order:1})
        .then((result) => {
            if(result.length == 0){
                res.json("there is no doctors")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});