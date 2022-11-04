const express = require('express');
const consultation = require('../models/consultation');
const router = express.Router();
const Observation = require('../models/observation')
const catchAsync = require('../utils/catchAsync')

exports.addObservations = async (req, res) => {
    /*User.insertMany([
    { name: 'Gourav', age: 20},
    { name: 'Kartik', age: 20},
    { name: 'Niharika', age: 20} */
    
    var names = [ "communication disorders", "motor disorders", "specific learning disabilities", "autism spectrum disorders", "developpemntal disorders", "TDA/h"];
    let name = names.map(word => word)
    console.log(name)
    let items = req.body.map(item => {
        return {
            name: item.name,
            value: item.value,
            consultId: req.params.consultId
        };
      }) ;
    
    await Observation.insertMany(items)
    .then(() => {
        console.log("obsservation Added!");
        res.status(200).json("obsservation Added!");
      })
      .catch(err => res.status(400).json("Error: " + err));
    }

// get observation per id child for progress tracker
exports.getObservationChild = catchAsync( async (req, res) => {

    const observationschild = await Observation.find({childId: req.params.childId}).select({ _id: 1, desc: 1, progression: 1});
    if(observationschild.length > 0){
        res.json(observationschild);
    }
    else {
        res.json("there is no observations for your child !! ")
    }



});



