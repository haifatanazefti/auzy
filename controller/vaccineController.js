const express = require('express');
const Medicalback = require('../models/Medicalback');
const Surgicalback = require('../models/Surgicalback');
const vaccine = require('../models/vaccine');
const catchAsync = require('../utils/catchAsync')

exports.addvaccine = async (req, res) => {
    const savedmed = new vaccine({
        vacname: req.body.vacname,
        date: req.body.date,
        sideffects: req.body.sideffects,
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
exports.getal = catchAsync( async (req, res) => {
    const backgrouns = await vaccine.find({child: req.params.child});
    if(backgrouns.length > 0){
        res.json(backgrouns);
    }
    else {
        res.json("there is no specialities !! ")
    }

});
