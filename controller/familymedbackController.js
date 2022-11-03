const express = require('express');
const familymedback = require('../models/familymedback');
const Medicalback = require('../models/Medicalback');
const Surgicalback = require('../models/Surgicalback');
const catchAsync = require('../utils/catchAsync')

exports.addfamedback = async (req, res) => {
    const savedmed = new familymedback({
        disname: req.body.disname,
        kinship: req.body.kinship,
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

exports.getall = catchAsync( async (req, res) => {
    const backgrouns = await familymedback.find({child: req.params.child});
    if(backgrouns.length > 0){
        res.json(backgrouns);
    }
    else {
        res.json("there is no specialities !! ")
    }

});

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
/*exports.getAllmedbackChild = catchAsync( async (req, res) => {
    const backgrouns = await Medicalback.find({child: req.params.child});
    if(backgrouns.length > 0){
        res.json(backgrouns);
    }
    else {
        res.json("there is no specialities !! ")
    }

});*/
