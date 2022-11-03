const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const Availablity = require('../models/Availablity')
const mongoose = require('mongoose');
let ts = Date.now();
exports.addPlanning = async (req, res) => {
    const availablity = new Availablity({
        date: req.body.date,
        time: req.body.time,
        endtime: req.body.endtime,
        type: req.body.type,
       background: req.body.background,
        doctorId: req.params.doctorId,
    });
    try {
        const userExists = await Availablity.exists({ date: req.body.date , time : req.body.time});
        if (userExists) {res.status(400).send('availability exist');}
        else {
    const savedA = await availablity.save();
         res.status(200).send('availability not exist');   
     }
      }
        catch(err){
            res.json({message : err});
        } 
}

exports.addPlanningPara = async (req, res) => {
    const availablity = new Availablity({
        date: req.body.date,
        time: req.body.time,
        endtime: req.body.endtime,
        type: req.body.type,
       background: req.body.background,
        paramedicalId: req.params.paramedicalId,
    });
    try {
        const userExists = await Availablity.exists({ date: req.body.date , time : req.body.time});
if (userExists) {res.status(400).send('availability exist');}
else {
    const savedA = await availablity.save();
       res.status(200).send('success');   }
}
        catch(err){
            res.json({message : err});
        } 
}

exports.getAllAvailiblities = catchAsync( async (req, res) => {
    await Availablity.aggregate([
        {
            $match: {
                $and:[{
                    "doctorId":  mongoose.Types.ObjectId(req.params.doctorId),
                    date : new Date(req.params.date),
                    statut: false
                }]
                
                      }
        },
        {$group : { _id :{'doctorId':mongoose.Types.ObjectId(req.params.doctorId) },
        obj: { $push: { _id: "$_id", date: "$date" , statut: "$statut" , time :"$time" , endtime :"$endtime", type : '$type' }}}},
     ] ).then(availiblties => {res.send({availiblties})})
      
    

});


exports.getAllAvailiblitiespara = catchAsync( async (req, res) => {
    await Availablity.aggregate([
        {
            $match: {
                $and:[{
                    "paramedicalId":  mongoose.Types.ObjectId(req.params.paramedicalId),
                    date : new Date(req.params.date),
                    statut: false
                }]
                
                      }
        },
        {$group : { _id :{'paramedicalId':mongoose.Types.ObjectId(req.params.paramedicalId) },
        obj: { $push: { _id: "$_id", date: "$date" , statut: "$statut" , time :"$time" , endtime :"$endtime", type : '$type' }}}},
     ] ).then(availiblties => {res.send({availiblties})})
      
    

});

exports.deleteAvailiblty = catchAsync( async (req, res) => {
    
    const deletedAv = await Availablity.findOneAndRemove({_id: req.params.id})
    if(!deletedAv){
        res.json("availiblity not existant!!");
    }
    else 
    {  res.status(200).json({
        status: 'success',
        data: {
            deletedAv,
        },
      });
    }
  
});

exports.updateSeance = catchAsync( async (req, res) => {
    
    const updatedAv = await Availablity.updateOne({_id: req.params.ids}
        , {$set: {
            date: req.body.date,
            time: req.body.time,
            type: req.body.type
        } });
        res.status(200).json({
           status: 'success',
           data: {
            updatedAv,
           },
         });
});
// get avlaibilies for doctor
exports.getplanningdoc = catchAsync( async (req, res) => {
    const planning = await Availablity.find(
        {doctorId: req.params.doctorId, 
        date: req.params.date }
        );
    if(planning.length>0){
        res.json(planning);
    }
    else {
        res.json("there is no planning")
    }
    

});

exports.getallplanningdoc = catchAsync( async (req, res) => {
    const planning = await Availablity.find(
        {doctorId: req.params.doctorId }
        );
    if(planning.length>0){
        res.json(planning);
    }
    else {
        res.json("there is no planning")
    }
    

});

exports.getallplanningpara = catchAsync( async (req, res) => {
    const planning = await Availablity.find(
        {paramedicalId: req.params.paramedicalId }
        );
    if(planning.length>0){
        res.json(planning);
    }
    else {
        res.json("there is no planning")
    }
    

});

exports.getplanningpara = catchAsync( async (req, res) => {
    const planning = await Availablity.find(
        {paramedicalId: req.params.paramedicalId ,
        date: req.params.date 
        });
    if(planning.length>0){
        res.json(planning);
    }
    else {
        res.json("there is no doctors")
    }
    

});
exports.updateAvailiblitydoct = catchAsync( async (req, res) => {
    const updatedAv = await Availablity.findOneAndUpdate({_id: req.params.id}
     , {$set: {
        type: req.body.type,
     } });
     if(updatedAv != null){
        res.json(updatedAv);
    }
    else {
        res.json("there is no doctors")
    }
});

/*
exports.addPlanning = async (req, res) => {
    const availablity = new Availablity({
        listAvailablity: req.body.listAvailablity,
        doctorId: req.params.doctorId,
    });
    try {
    const savedA = await availablity.save();
        res.json(savedA);   }
        catch(err){
            res.json({message : err});
        } 
}

exports.getAllAvailiblities = catchAsync( async (req, res) => {
    const availiblies = await Availablity.find({doctorId: req.params.doctorId });
    if(availiblies.length > 0){
        res.json(availiblies);
    }
    else {
        res.json("there is no availiblies !! ")
    }

});

exports.deleteSeance = catchAsync( async (req, res) => {
    
    await Availablity.findOneAndUpdate(
        { id: req.body._id },
        { $pull: { listAvailablity: { _id: req.params.ids} } },
        { safe: true, multi: false }
      );
      /* if collection dos't contain any seance => delete it */
  /*    await Availablity.remove({ listAvailablity: { $exists: true, $size: 0 } })
        
      return res.status(200).json({ message: "Seance Deleted Successfully" });
});

exports.updateSeance = catchAsync( async (req, res) => {
    
    await Availablity.update(
        { id: req.body.id, "listAvailablity._id": req.params.ids },
        {
            $set: {
                "listAvailablity.$.date":  req.body.date,
                "listAvailablity.$.time":   req.body.time,
                "listAvailablity.$.type":   req.body.type,
             }
        },
    );
      return res.status(200).json({ message: "Seance modified Successfully" });
});
*/



