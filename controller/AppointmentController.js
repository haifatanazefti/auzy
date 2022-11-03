const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Availablity = require('../models/Availablity');
const catchAsync = require('../utils/catchAsync')
var ObjectID = require('mongodb').ObjectID

exports.addApp = async (req, res) => {
    const appointment = new Appointment({
        doctorId: req.body.doctorId,
        avId: req.body.avId,
        type: "medical",
        childId: req.body.childId,
        ParentId: req.params.ParentId,
    }); 
    
    try {
    const savedApp = await appointment.save();
    const reservedAv = await Availablity.findByIdAndUpdate(req.body.avId
      , {$set: {
          statut: true,
      } });
        res.json(savedApp);   }
        catch(err){
            res.json({message : err});
        } 
}

exports.addApppara = async (req, res) => {
  const appointment = new Appointment({
    paramedicalId: req.body.paramedicalId,
      avId: req.body.avId,
      type: "paramedical",
      childId: req.body.childId,
      ParentId: req.params.ParentId
  }); 
  
  try {
  const savedApp = await appointment.save();
  const reservedAv = await Availablity.findByIdAndUpdate(req.body.avId
    , {$set: {
        statut: true,
    } });
      res.json(savedApp);   }
      catch(err){
          res.json({message : err});
      } 
}

// get appoitmnets for parents that refers to parentId and status=confirmed
// lezem jointure bin seance o rendez-vous
exports.getAllConfirmedAppointmentsPatient = catchAsync( async (req, res) => {
    Appointment.aggregate([
        { $lookup:
           {
            from: "plannings",
            localField: "avId",
            foreignField: "_id",
            as: "rdvdetails",
           }
         },
         
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
                $and:[{
                    ParentId: new ObjectID(req.params.ParentId),
                    status : 'c',
                    type:"medical"
                }]
                
                      }
        },
        ])
        .then((result) => {
          if(result.length == 0){
            res.json("there is no Confirmed Appointments. please wait for doctor's confirmation !!")
          }
          else {
            res.json(result);
          }
         
       
        })
        .catch((error) => {
          console.log(error);
        });
    
});


exports.getAllConfirmedAppointmentsPatientPara = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       
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
                  ParentId: new ObjectID(req.params.ParentId),
                  status : 'c',
                  type:"paramedical"
              }]
              
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("there is no Confirmed Appointments. please wait for paramedical's confirmation !!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});


exports.getAllWaitingAppointmentsPatient = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       
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
              $and:[{
                  ParentId: new ObjectID(req.params.ParentId),
                  status : 'e'
              }]
              
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("there is no pending Appointments!")
        }
        else {
          res.json(result);
        }
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});



exports.getAllConfirmedAppointmentsDoctor = catchAsync( async (req, res) => {
    Appointment.aggregate([
        { $lookup:
           {
            from: "plannings",
            localField: "avId",
            foreignField: "_id",
            as: "rdvdetails",
           }
         },
         { $lookup:
          {
           from: "childtnds",
           localField: "childId",
           foreignField: "_id",
           as: "childdetails",
          }
        },
       /*  { $lookup:
            {
             from: "parents",
             localField: "ParentId",
             foreignField: "_id",
             as: "Parentdetails",
            }
          },*/
        

         {
            $match: {
                doctorId: new ObjectID(req.params.doctorId),
                status : 'c'
                      }
                      
        },
        ])
        .then((result) => {
          if(result.length == 0){
            res.json("there is no confirmed Appointments!")
          }
          else {
            res.json(result);
          }
       
        })
        .catch((error) => {
          console.log(error);
        });
    
});




exports.confdoc = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       { $lookup:
          {
           from: "childtnds",
           localField: "childId",
           foreignField: "_id",
           as: "childdetails",
          }
        },
        { $lookup:
          {
           from: "parents",
           localField: "ParentId",
           foreignField: "_id",
           as: "Parentdetails",
          }
        },
       {
          $match: {
              doctorId: new ObjectID(req.params.doctorId),
              status : 'c'
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("there is no confirmed Appointments! ")
        }
        else {
          res.json(result);
        }
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});





exports.getAllWaitingAppointmentsDoctor = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       { $lookup:
          {
           from: "childtnds",
           localField: "childId",
           foreignField: "_id",
           as: "childdetails",
          }
        },
        { $lookup:
          {
           from: "parents",
           localField: "ParentId",
           foreignField: "_id",
           as: "Parentdetails",
          }
        },
       {
          $match: {
              doctorId: new ObjectID(req.params.doctorId),
              status : 'e'
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("there is no waiting Appointments! ")
        }
        else {
          res.json(result);
        }
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});


exports.getAllWaitingAppointmentsPara = catchAsync( async (req, res) => {
  Appointment.aggregate([
    { $lookup:
      {
       from: "plannings",
       localField: "avId",
       foreignField: "_id",
       as: "rdvdetails",
      }
    },
    { $lookup:
       {
        from: "childtnds",
        localField: "childId",
        foreignField: "_id",
        as: "childdetails",
       }
     },
     { $lookup:
       {
        from: "parents",
        localField: "ParentId",
        foreignField: "_id",
        as: "Parentdetails",
       }
     },
       {
          $match: {
            paramedicalId: new ObjectID(req.params.paramedicalId),
              status : 'e'
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("there is no waiting Appointments! ")
        }
        else {
          res.json(result);
        }
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});

exports.getAllConfirmedAppointmentsDoctor = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       { $lookup:
          {
           from: "parents",
           localField: "ParentId",
           foreignField: "_id",
           as: "Parentdetails",
          }
        },
       {
          $match: {
              doctorId: new ObjectID(req.params.doctorId),
              status : 'c'
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("there is no Appointments!")
        }
        else {
          res.json(result);
        }
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});

exports.getAllConfirmedAppointmentsPara = catchAsync( async (req, res) => {
  Appointment.aggregate([
     { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       { $lookup:
          {
           from: "childtnds",
           localField: "childId",
           foreignField: "_id",
           as: "childdetails",
          }
        },
        { $lookup:
          {
           from: "parents",
           localField: "ParentId",
           foreignField: "_id",
           as: "Parentdetails",
          }
        },
       {
          $match: {
            paramedicalId: new ObjectID(req.params.paramedicalId),
              status : 'c'
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("there is no Appointments!")
        }
        else {
          res.json(result);
        }
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});

exports.getDetailsDoctorApp = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       { $lookup:
          {
           from: "parents",
           localField: "ParentId",
           foreignField: "_id",
           as: "Parentdetails",
          }
        },
       {
          $match: {
            _id: new ObjectID(req.params.id),
                    }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("no Appointments with this id !")
        }
        else {
          res.json(result);
        }
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});



exports.confirmAppoitment = catchAsync( async (req, res) => {
    
  const confirmedApp = await Appointment.updateOne({_id: req.params.id}
      , {$set: {
          status: "c",
      } });
      res.status(200).json({
         status: 'success',
         data: {
          confirmedApp,
         },
       });
});

exports.cancelAppointment = catchAsync( async (req, res) => {
    
  const cancelApp = await Appointment.findByIdAndRemove(req.params.id)
  if(!cancelApp){
      res.json("Appointment not existant!!");
  }
  else 
  {  res.status(200).json({
      status: 'success',
      data: {
        cancelApp,
      }, 
    });
  }
});

exports.getDetailsPatientApp = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
       
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
              
                  _id: new ObjectID(req.params.id),
                  }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("no details !!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});


exports.getDetailsPatientAppara = catchAsync( async (req, res) => {
  Appointment.aggregate([
      { $lookup:
         {
          from: "plannings",
          localField: "avId",
          foreignField: "_id",
          as: "rdvdetails",
         }
       },
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
              
                  _id: new ObjectID(req.params.id),
                  }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("no details !!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });
  
});


// get list patients for the doctor
exports.getPatientsDoc = catchAsync (async (req, res) => {

  Appointment.aggregate([
 
    { $lookup:
      {
       from: "plannings",
       localField: "avId",
       foreignField: "_id",
       as: "rdvdetails",
      }
    },
      { $lookup:
         {
          from: "childtnds",
          localField: "childId",
          foreignField: "_id",
          as: "childdetails",
         }
       },
       {
        $lookup:
        {
         from: "disorderstnds",
         localField: "childdetails.DisordersTND",
         foreignField: "_id",
         as: "DisordersTND",
        }
      
      }, {
        $addFields : {
          "childdetails.Disorders_TND" : "$DisordersTND"
        }
      },
       
      {$project : {
        "DisordersTND": 0
      }},
      
       {
          $match: {
              doctorId: new ObjectID(req.params.doctorId)
          }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("no patients !!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });

});

exports.getPatientPara = catchAsync (async (req, res) => {

  Appointment.aggregate([
    { $lookup:
      {
       from: "plannings",
       localField: "avId",
       foreignField: "_id",
       as: "rdvdetails",
      }
    },
      { $lookup:
         {
          from: "parents",
          localField: "ParentId",
          foreignField: "_id",
          as: "Parentdetails",
         }
       },
       {
          $match: {
            paramedicalId: new ObjectID(req.params.paramedicalId)
          }
      },
      ])
      .then((result) => {
        if(result.length == 0){
          res.json("no patients !!")
        }
        else {
          res.json(result);
        }
       
     
      })
      .catch((error) => {
        console.log(error);
      });

});



/*
exports.getDetails = catchAsync( async (req, res) => {
    
        const childDetails = await ChildTND.findById(req.params.id);
        res.json(childDetails);
  
});

exports.deleteChild = catchAsync( async (req, res) => {
    
        const deletedChild = await ChildTND.findByIdAndRemove(req.params.id)
        if(!deletedChild){
            res.json("child not existant!!");
        }
        else 
        {  res.status(200).json({
            status: 'success',
            data: {
                deletedChild,
            },
          });
        }
      
});


exports.updateChild = catchAsync( async (req, res) => {
        const updatedChild = await ChildTND.updateOne({_id: req.params.id}
         , {$set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            bloodType: req.body.bloodType,
            numberBrothers: req.body.numberBrothers,
            allergy: req.body.allergy
         } });
         res.status(200).json({
            status: 'success',
            data: {
                updatedChild,
            },
          });
 });


 exports.GetDisoders = catchAsync (async (req, res) => {

        ChildTND.aggregate([
            { $lookup:
               {
                from: "disorderstnds",
                localField: "DisordersTND",
                foreignField: "_id",
                as: "Disorders_TND",
               }
             },
             {
                $match: {
                    _id: new ObjectID(req.params.id)
                }
            },
            ])
            .then((result) => {
             res.json(result);
           
            })
            .catch((error) => {
              console.log(error);
            });
    
});
  */   