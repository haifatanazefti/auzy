const express = require('express');
const Allergie = require('../models/Allergie');
const familymedback = require('../models/familymedback');
const Medicalback = require('../models/Medicalback');
const Surgicalback = require('../models/Surgicalback');
const catchAsync = require('../utils/catchAsync')

exports.addallergie = async (req, res) => {
    const savedmed = new Allergie({
        name: req.body.name,
        type: req.body.type,
        note: req.body.note,
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
exports.getAllallergiesChild = catchAsync( async (req, res) => {
    const backgrouns = await Allergie.find({child: req.params.child});
    if(backgrouns.length > 0){
        res.json(backgrouns);
    }
    else {
        res.json("there is no specialities !! ")
    }

});

exports.deleteAllegry = catchAsync( async (req, res) => {
    
    const deletedAllergy = await Allergie.findByIdAndRemove(req.params.id)
    if(!deletedAllergy){
        res.json("allergy not existant!!");
    }
    else 
    {  res.status(200).json({
        status: 'success',
        data: {
            deletedAllergy,
        },
      });
    }
  
});
