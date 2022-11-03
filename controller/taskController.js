const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const Availablity = require('../models/Availablity')
const mongoose = require('mongoose');
const task = require('../models/task');
let ts = Date.now();
exports.addTask = async (req, res) => {
    const taskk = new task({
        title: req.body.title,
        desc: req.body.desc,
        type: req.body.type,
        consultId: req.body.consultId,
    });
    try {
    const savedA = await taskk.save();
         res.status(200).send('succes');   
     }
      
        catch(err){
            res.json({message : err});
        } 
}

exports.doneTask = catchAsync( async (req, res) => {
    
    const donetask = await task.updateOne({_id: req.params.id}
        , {$set: {
            done: true,
        } });
        res.status(200).json({
           status: 'success',
           data: {
            donetask,
           },
         });
  });