const express = require('express');
const Drug = require('../models/Drug');
const Ligneord = require('../models/Ligneord');
const Medicalback = require('../models/Medicalback');
const Surgicalback = require('../models/Surgicalback');
const vaccine = require('../models/vaccine');
const catchAsync = require('../utils/catchAsync')
var ObjectID = require('mongodb').ObjectID
let ts = Date.now();
exports.addlord = async (req, res) => {
    const savedmed = new Ligneord({
        quantity: req.body.quantity,
        nbrtimes: req.body.nbrtimes,
        duration: req.body.duration,
        time: req.body.time,
        notes: req.body.notes,
        datedebut: req.body.datedebut,
        datefin: req.body.datefin,
        drugId: req.body.drugId,
        child: req.body.child
    });
    try {
    const med = await savedmed.save();
        res.json(med);  
     }
        catch(err){
            res.json({message : err});
        } 
}


exports.getdetailsreminder = catchAsync( async (req, res) => {
    Ligneord.aggregate([
        { $lookup:
           {
            from: "drugs",
            localField: "drugId",
            foreignField: "_id",
            as: "drugdetails",
           }
         },
       
        
         {
            $match: {
                child: new ObjectID(req.params.child)
                
                      }
        },
        ])
        .then((result) => {
          if(result.length == 0){
            res.json("there is no details! ")
          }
          else {
            res.json(result);
          }
       
        })
        .catch((error) => {
          console.log(error);
        });
    
  });


  exports.getdetails = catchAsync( async (req, res) => {
    Ligneord.aggregate([
        { $lookup:
           {
            from: "drugs",
            localField: "drugId",
            foreignField: "_id",
            as: "drugdetails",
           }
         },
       
        
         {
            $match: {
                _id: new ObjectID(req.params.id)
                      }
        },
        ])
        .then((result) => {
          if(result.length == 0){
            res.json("there is no details! ")
          }
          else {
            res.json(result);
          }
       
        })
        .catch((error) => {
          console.log(error);
        });
    
  });