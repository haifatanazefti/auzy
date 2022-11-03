const express = require('express');
const Drug = require('../models/Drug');
const Medicalback = require('../models/Medicalback');
const Surgicalback = require('../models/Surgicalback');
const vaccine = require('../models/vaccine');
const catchAsync = require('../utils/catchAsync')

exports.adddrug = async (req, res) => {
    const savedmed = new Drug({
        name: req.body.name,
        image: req.body.image
    });
    try {
    const med = await savedmed.save();
        res.json(med);  
     }
        catch(err){
            res.json({message : err});
        } 
}