const express = require('express');
const chronic = require('../models/chronic');
const router = express.Router();
const DisordersTND = require('../models/disordersTND')
const catchAsync = require('../utils/catchAsync')

exports.addchronic = async (req, res) => {
    const disordersTND = new chronic({
        Name: req.body.Name,
    });
    try {
    const savedD = await disordersTND.save();
        res.json(savedD);   }
        catch(err){
            res.json({message : err});
        } 
}

exports.getchronics = catchAsync( async (req, res) => {
    const disordersTND = await chronic.find();
    if(disordersTND.length > 0){
        res.json(disordersTND);
    }
    else {
        res.json("there is no disorders TND !! ")
    }

});
