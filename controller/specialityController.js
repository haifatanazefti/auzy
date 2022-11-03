const express = require('express');
const router = express.Router();
const Speciality = require('../models/speciality')
const catchAsync = require('../utils/catchAsync')

exports.addSpec = async (req, res) => {
    const spec = new Speciality({
        Name: req.body.Name,
        category: req.body.category,
    });
    try {
    const savedSpec = await spec.save();
        res.json(savedSpec);   }
        catch(err){
            res.json({message : err});
        } 
}

exports.getAllSpecialitiesPara = catchAsync( async (req, res) => {
    const specialities = await Speciality.find({category: true});
    if(specialities.length > 0){
        res.json(specialities);
    }
    else {
        res.json("there is no specialities !! ")
    }

});
exports.getAllSpecialitiesmed = catchAsync( async (req, res) => {
    const specialities = await Speciality.find({category: false});
    if(specialities.length > 0){
        res.json(specialities);
    }
    else {
        res.json("there is no specialities !! ")
    }

});
