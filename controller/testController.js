const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const Availablity = require('../models/Availablity')
const mongoose = require('mongoose');
const Test = require('../models/Test');
let ts = Date.now();
exports.addTest = async (req, res) => {
    const test = new Test({
        name: req.body.name,
        typeAlgo: req.body.typeAlgo,
    });
    try {
    const saveTest = await test.save();
         res.status(200).send('succes');   
     }
      
        catch(err){
            res.json({message : err});
        } 
}
exports.getTests = catchAsync( async (req, res) => {
    const tests = await Test.find();
    if(tests.length > 0){
        res.json(tests);
    }
    else {
        res.json("there is no tests !! ")
    }

});