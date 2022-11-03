const express = require('express');
const Medicalback = require('../models/Medicalback');
const router = express.Router();
const Speciality = require('../models/speciality')
const catchAsync = require('../utils/catchAsync')

exports.addmedback = async (req, res) => {
    const savedmed = new Medicalback({
        medecineName: req.body.medecineName,
        duration: req.body.duration,
        days: req.body.days,
        currentUse: req.body.currentUse,
        child: req.params.child

    });
    try {
    const med = await savedmed.save();
        res.json(med);  
     }
        catch(err){
            res.json({message : err});
        } 
}
/*
exports.getAllSpecialitiesPara = catchAsync( async (req, res) => {
    const specialities = await Speciality.find({category: true});
    if(specialities.length > 0){
        res.json(specialities);
    }
    else {
        res.json("there is no specialities !! ")
    }

});*/
exports.getAllmedbackChild = catchAsync( async (req, res) => {
    const backgrouns = await Medicalback.find({child: req.params.child});
    if(backgrouns.length > 0){
        res.json(backgrouns);
    }
    else {
        res.json("there is no specialities !! ")
    }

});
