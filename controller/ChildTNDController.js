const express = require('express');
const router = express.Router();
const ChildTND = require('../models/ChildTND')
const catchAsync = require('../utils/catchAsync')
var ObjectID = require('mongodb').ObjectID
const mongoose = require('mongoose');
exports.addChild = async (req, res) => {
    console.log("add its meee !!");
    const child = new ChildTND({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        weight: req.body.weight,
        height: req.body.height,
        bloodType: req.body.bloodType,
        numberBrothers: req.body.numberBrothers,
        DisordersTND: req.body.DisordersTND,
        birthweight: req.body.birthweight,
        gista_age: req.body.gista_age,
        type_birth: req.body.type_birth,
        presentation: req.body.presentation,
        feeding_meth: req.body.feeding_meth,
        chronics: req.body.chronics,
        parent: req.params.parent
    });
    try {
    const savedChild = await child.save();
        res.json(savedChild);   }
        catch(err){
            res.json({message : err});
        } 
}


exports.updateechild = catchAsync( async (req, res) => {
    const updatedChild = await ChildTND.findOneAndUpdate({_id: req.params.id}
     , {$set: {
        numberBrothers: req.body.numberBrothers,
        weight: req.body.weight,
        height: req.body.height,
        DisordersTND: req.body.DisordersTND
     } }, {new: true});
     res.status(200).json({
        status: 'success',
        data: {
            updatedChild,
        },
      });
});

exports.getChildrens = catchAsync( async (req, res) => {
        const child = await ChildTND.find({parent: req.params.parent }).select({ id: 1, lastName: 1, firstName:1,
            birthDate: 1});;
        res.json(child);
    
});

/*exports.getDetails = catchAsync( async (req, res) => {
    
        const childDetails = await ChildTND.findById(req.params.id).select({ _id: 1, firstName: 1,lastName: 1,
            birthDate: 1, gender:1, weight:1 , height:1, bloodType:1, numberBrothers:1, 
            allergy:1});;
        res.json(childDetails);
  
});
*/
exports.getDetails = catchAsync( async (req, res) => {
    console.log("get details fonction hereee !! ");
    ChildTND.aggregate([
        { $lookup:
           {
            from: "disorderstnds",
            localField: "DisordersTND",
            foreignField: "_id",
            as: "Disorders_TND",
           }
         },
         { $lookup:
            {
             from: "chronics",
             localField: "chronics",
             foreignField: "_id",
             as: "chronics",
            }
          },

         {
            $match: {
                _id: new ObjectID(req.params.id)

            }
        },
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no childrens with this id")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
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
        const updatedChild = await ChildTND.findOneAndUpdate({id: req.params.id}
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

exports.allchildrens = catchAsync( async (req, res) => {
   // console.log("get doctors fonction hereee !! ");
    ChildTND.aggregate([
        { $lookup:
           {
            from: "disorderstnds",
            localField: "DisordersTND",
            foreignField: "_id",
            as: "Disorders_TND",
           }
         },{
            $match: {
                parent: new ObjectID(req.params.parent)
           }
         },
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no doctors")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

exports.sommechilds = catchAsync( async (req, res) => {
    
    const chidrens = await ChildTND.countDocuments();
        res.json(chidrens);
    

});

exports.autism = catchAsync( async (req, res) => {
   
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
                "Disorders_TND.Name": "Autism",

            }
        
        },
        { $group: { _id: null, count: { $sum: 1 } } }
      //  { $addFields: {studentCount: {$size: "$Disorders_TND"}}}
       
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no childrens with this id")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

exports.adhd = catchAsync( async (req, res) => {
   
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
                "Disorders_TND.Name": "Child with high potential",

            }
        
        },
        { $group: { _id: null, count: { $sum: 1 } } }
      //  { $addFields: {studentCount: {$size: "$Disorders_TND"}}}
       
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no childrens with this id")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});
exports.sommechilds = catchAsync( async (req, res) => {
    
    const chidrens = await ChildTND.countDocuments();
        res.json(chidrens);
    

});



exports.intellectual = catchAsync( async (req, res) => {
   
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
                "Disorders_TND.Name": "intellectual disability",

            }
        
        },
        { $group: { _id: null, count: { $sum: 1 } } }
      //  { $addFields: {studentCount: {$size: "$Disorders_TND"}}}
       
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no childrens with this id")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});
exports.hyper = catchAsync( async (req, res) => {
   
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
                "Disorders_TND.Name": "hyperactivity",

            }
        
        },
        { $group: { _id: null, count: { $sum: 1 } } }
      //  { $addFields: {studentCount: {$size: "$Disorders_TND"}}}
       
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no childrens with this id")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

exports.learning = catchAsync( async (req, res) => {
   
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
                "Disorders_TND.Name": "learning disabilities",

            }
        
        },
        { $group: { _id: null, count: { $sum: 1 } } }
      //  { $addFields: {studentCount: {$size: "$Disorders_TND"}}}
       
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no childrens with this id")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});



exports.adddisorders = catchAsync( async (req, res) => {
    const updatedChild = await ChildTND.findByIdAndUpdate({_id: req.params.id}
     , { $push: { "DisordersTND": req.body.disorder } }, {new: true});
     res.status(200).json({
        status: 'success',
        data: {
            updatedChild,
        },
      });
});


exports.deletedisorders = catchAsync( async (req, res) => {
    const updatedChild = await ChildTND.findByIdAndUpdate({_id: req.params.id}
     , { $pull: { "DisordersTND": req.body.disorder } }, {new: true});
     res.status(200).json({
        status: 'success',
        data: {
            updatedChild,
        },
      });
});



exports.addchronics = catchAsync( async (req, res) => {
    const updatedChild = await ChildTND.findByIdAndUpdate({_id: req.params.id}
     , { $push: { "chronics": req.body.chronic } }, {new: true});
     res.status(200).json({
        status: 'success',
        data: {
            updatedChild,
        },
      });
});


exports.deletechronics = catchAsync( async (req, res) => {
    const updatedChild = await ChildTND.findByIdAndUpdate({_id: req.params.id}
     , { $pull: { "chronics": req.body.chronic } }, {new: true});
     res.status(200).json({
        status: 'success',
        data: {
            updatedChild,
        },
      });
});