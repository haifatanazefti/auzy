const express = require('express');
const router = express.Router();
const DisordersTND = require('../models/disordersTND')
const catchAsync = require('../utils/catchAsync')

exports.addDisordersTND = async (req, res) => {
    const disordersTND = new DisordersTND({
        Name: req.body.Name,
    });
    try {
    const savedD = await disordersTND.save();
        res.json(savedD);   }
        catch(err){
            res.json({message : err});
        } 
}

exports.getDisordersTND = catchAsync( async (req, res) => {
    const disordersTND = await DisordersTND.find();
    if(disordersTND.length > 0){
        res.json(disordersTND);
    }
    else {
        res.json("there is no disorders TND !! ")
    }

});
