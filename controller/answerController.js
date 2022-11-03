const express = require('express');
const Answer = require('../models/Answer');

exports.addAnswer = async (req, res) => {
    const savedanswer = new Answer({
        idQuest: req.body.idQuest,
        idtestAnswer: req.body.idtestAnswer,
        value: req.body.value
    });
    try {
    const answerr = await savedanswer.save();
        res.json(answerr);  
     }
        catch(err){
            res.json({message : err});
        } 
}