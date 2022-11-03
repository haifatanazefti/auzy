const express = require('express');
const consultation = require('../models/consultation');
const router = express.Router();
const Consultation = require('../models/consultation')
const catchAsync = require('../utils/catchAsync')
var ObjectID = require('mongodb').ObjectID

// add new consultation infos for medical staff
exports.addconsultation = async (req, res) => {
    const consult = new Consultation({
        childId: req.body.childId,
        doctorId: req.body.doctorId,
        childcomp :req.body.childcomp,
        observation :req.body.observation,
        recomm :req.body.recomm,
        followup :req.body.followup,
    });
    try {
    const savedconsult = await consult.save();
        res.json(savedconsult);   }
        catch(err){
            res.json({message : err});
        } 
}

exports.addconsultationPara = async (req, res) => {
  const consult = new Consultation({
      childId: req.body.childId,
      paramedicalId: req.body.paramedicalId,
      childcomp :req.body.childcomp,
      observation :req.body.observation,
      followup :req.body.followup,
  });
  try {
  const savedconsult = await consult.save();
      res.json(savedconsult);   }
      catch(err){
          res.json({message : err});
      } 
}

exports.getlastCon = catchAsync( async (req, res) => {
   
    const backgrouns = await Consultation.find({childId: req.params.childId, doctorId: req.params.doctorId}).sort({date:-1}).limit(1);
    if(backgrouns.length > 0){
        res.json(backgrouns);
    }
    else {
        res.json("there is no consultation !! ")
    }

});

exports.getlastConPara = catchAsync( async (req, res) => {
   
  const backgrouns = await Consultation.find({childId: req.params.childId, paramedicalId: req.params.paramedicalId}).sort({date:-1}).limit(1);
  if(backgrouns.length > 0){
      res.json(backgrouns);
  }
  else {
      res.json("there is no specialities !! ")
  }

});

/*exports.getAllSpecialities = catchAsync( async (req, res) => {
    const specialities = await Speciality.find();
    if(specialities.length > 0){
        res.json(specialities);
    }
    else {
        res.json("there is no specialities !! ")
    }

});*/
exports.getinfos = catchAsync( async (req, res) => {
    Consultation.aggregate([
        { $lookup:
           {
            from: "observations",
            localField: "_id",
            foreignField: "consultId",
            as: "consultDet",
           }
         },
        {
            $match: {
               
              $and: [{
                childId: new ObjectID(req.params.childId),
                paramedicalId : null
              }]
                 
                      }
        },
        ]).sort({date:-1}).limit(1)
        .then((result) => {
          if(result.length == 0){
            res.json("no infos!!")
          }
          else {
            res.json(result);
          }
         
       
        })
        .catch((error) => {
          console.log(error);
        });
    
});

exports.allconsultations = catchAsync( async (req, res) => {
// get all consultation history for medical
   Consultation.aggregate([
       { $lookup:
          {
           from: "medicals",
           localField: "doctorId",
           foreignField: "_id",
           as: "medicaldetails",
          }
        },
        {
          $lookup:
          {
           from: "specialities",
           localField: "medicaldetails.speciality",
           foreignField: "_id",
           as: "speciality",
          }
        
        }, {
          $addFields : {
            "medicaldetails.speciality_Doctor" : "$speciality"
          }
        },
        {$project : {
          "speciality": 0
        }},
        {
           $match: {
            $and: [{
              childId: new ObjectID(req.params.childId),
              paramedicalId : null
            }]
            
          }
        },
       ]).sort({date:-1})
       .then((result) => {
           if(result.length == 0){
               res.json("there is no consultations")
           }
           else {
               res.json(result);
           }
       })
       .catch((error) => {
         console.log(error);
       });
});

exports.allconsultationsPara = catchAsync( async (req, res) => {
  // get all consultation  history for paramedical staff
   Consultation.aggregate([
       { $lookup:
          {
           from: "paramedicals",
           localField: "paramedicalId",
           foreignField: "_id",
           as: "paramedicaldetails",
          }
        },
        {
          $lookup:
          {
           from: "specialities",
           localField: "paramedicaldetails.speciality",
           foreignField: "_id",
           as: "speciality",
          }
        
        }, {
          $addFields : {
            "paramedicaldetails.speciality_Paramedical" : "$speciality"
          }
        },
        {$project : {
          "speciality": 0
        }},
        {
           $match: {
            $and:[{
            childId: new ObjectID(req.params.childId),
            doctorId: null
          }],
          }
        },
       ]).sort({date:-1})
       .then((result) => {
           if(result.length == 0){
               res.json("there is no consultations")
           }
           else {
               res.json(result);
           }
       })
       .catch((error) => {
         console.log(error);
       });
});



exports.getone = catchAsync( async (req, res) => {

  const consultations = await Consultation.find({_id: req.params.id});
  if(consultations){
      res.json(consultations);
  }
  else {
      res.json("there is no observations for your child !! ")
  }



});

// history of tasks requested by the paramedical
exports.gettasks = catchAsync( async (req, res) => {
  Consultation.aggregate([
      { $lookup:
         {
          from: "tasks",
          localField: "_id",
          foreignField: "consultId",
          as: "tasks",
         }
       },
  {
          $match: {
            $and: [{
              paramedicalId: new ObjectID(req.params.paramedicalId),
            }]
                }
      },
      ]).sort({date:-1})
      .then((result) => {
        if(result.length == 0){
          res.json("no tasks!!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});

exports.gettaskss = catchAsync( async (req, res) => {
  Consultation.aggregate([
      { $lookup:
         {
          from: "tasks",
          localField: "_id",
          foreignField: "consultId",
          as: "tasks",
         }
       },
 
  {
          $match: {
            $and: [{
              _id: new ObjectID(req.params.id),
            }]
             
            
               
                    }
      },
      ]).sort({date:-1})
      .then((result) => {
        if(result.length == 0){
          res.json("no tasks!!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});

exports.gettaskschilds = catchAsync( async (req, res) => {
  Consultation.aggregate([
      { $lookup:
         {
          from: "tasks",
          localField: "_id",
          foreignField: "consultId",
          as: "tasks",
         }
       },
   

  {
          $match: {
            $and: [{
              childId: new ObjectID(req.params.childId),
              doctorId : null
            }]
                    }
      },
      ]).sort({date:-1})
      .then((result) => {
        if(result.length == 0){
          res.json("no tasks!!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});