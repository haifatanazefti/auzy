const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID
const Medical = require('../models/Medical');
const Doctor = require('../models/Medical')
const catchAsync = require('../utils/catchAsync')
const bycrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

const AppError = require('../config/appError');
const sendEmail = require('../config/email');

/* zedet id f medicaal maadesh esmou _id !!!!!!!!!!!!!!  */

exports.addDoctor = async (req, res) => {
      // generate salt to hash password
      const salt = await bcrypt.genSalt(10);
    const doctor = new Doctor({
        //id: new mongoose.mongo.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        statut: req.body.statut,
        speciality: req.body.speciality,
        officePhone: req.body.officePhone,
        rating: req.body.rating,
        infos: req.body.infos,
        tarifs : req.body.tarifs,
        lang : req.body.lang,
        password : await bcrypt.hash("haifa", salt)

    });


    try {
    const savedDoctor = await doctor.save();
        res.json(savedDoctor);   }
        catch(err){
            res.json({message : err});
        } 
}

exports.getAll =  async (req, res) => {
    Doctor.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Doctor",
           }
         },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no doctors with this speciality")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
        
    
}
exports.try = catchAsync( async (req, res) => {
    
    const doctordetails = await Medical.find({_id: req.params.id });
        res.json(doctordetails);
    

});
exports.trydelete = catchAsync( async (req, res) => {
    
    const deletedmedical = await Medical.findOneAndRemove({_id: req.params.id})
    if(!deletedmedical){
        res.json("medical not existant!!");
    }
    else 
    {  res.status(200).json({
        status: 'success',
        data: {
            deletedmedical,
        },
      });
    }
  
});

exports.getdoctor = catchAsync(async (req, res) => {
        //const doctor = await Doctor.find({speciality: req.params.speciality });
       // res.json(doctor);
       Doctor.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Doctor",
           }
         },
         {
            $match: {
                "speciality_Doctor.Name": req.params.speciality,

            }
        },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no doctors with this speciality")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

// fetch all pedopsy ans take the adress as params to
exports.getAllPedopsy = catchAsync(async (req, res) => {
    
    var name="child";
        Doctor.aggregate([
                { $lookup:
                   {
                    from: "specialities",
                    localField: "speciality",
                    foreignField: "_id",
                    as: "speciality_Doctor",
                   }
                 },
                 {
                    $match: {
                        "speciality_Doctor.Name": { $regex: name + '.*' },
                         adress: req.params.adress
                   }
                },
                ])
                .then((result) => {
                    if(result.length == 0){
                        res.json("there is no doctors with this speciality in this country")
                    }
                    else {
                        res.json(result);
                    }
                })
                .catch((error) => {
                  console.log(error);
                });
});

// Search doctors with first/last name and their speciality
exports.searchDoctor = catchAsync(async (req, res) => {

           
        let data = await Doctor.find(
            {
                "$or" :[
                    {firstName:{$regex:req.params.key}},
                    {lastName:{$regex:req.params.key}},
                ]
            }  
          )
    
          res.send(data);
     
      
  
});

exports.getDetails = catchAsync( async (req, res) => {
    console.log("get details fonction hereee !! ");
    Doctor.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Doctor",
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
                res.json("there is no doctors with this identifiant")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

exports.alldoctors = catchAsync( async (req, res) => {
    console.log("get doctors fonction hereee !! ");
    Doctor.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Doctor",
           }
         },
         {
            $match: {
                speciality: new ObjectID(req.params.speciality)
            }
        },
        { $sort : { rating : -1 } }
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

exports.topdoc = catchAsync( async (req, res) => {
    console.log("top doctors fonction hereee !! ");
    Doctor.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Doctor",
           }
         },
        
        { $sort : { rating : -1 } },
        { $limit : 3}
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

exports.somme = catchAsync( async (req, res) => {
    
    const doctors = await Medical.countDocuments();
        res.json(doctors);
    

});

//creating a function that generate the token
// eslint-disable-next-line arrow-body-style
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  //Create a function to hundle the token
  
  const createSendToken = (user, statusCode, res) => {
    res.status(statusCode).json(user);
  };

exports.loginMedical = async (req, res) => {
    const body = req.body;
    const medical = await Medical.findOne({ email: body.email });
    if (medical) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, medical.password);
      if (validPassword) {
       // res.status(200).json({ message: "Valid password" });
         //send token to the client
    const token = signToken(medical._id);
    const newmedical = await Medical.findByIdAndUpdate(
      medical._id,
      {
        token: token,
      },
      { new: true}
    );
    createSendToken(newmedical, 200, res);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  
}

//  create random password
function generateRandomPassword() {
  var password = "";
  for (let index = 0; index < 3; index++) {
      if (password.length <= 3) {
          password += ('a1bc2çd3ef4gğ5hı7ij8kl0mn8oö9prsştyuüvyzwx').split('')[(Math.floor(Math.random() * 26))];
      }
  }
  password += new Date().getMilliseconds();
  return password
}


exports.forgotPasswordMed = catchAsync(async (req, res, next) => {
  /*getting user based on his email*/
  const code = generateRandomPassword()
  const user = await Doctor.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }

  
  const resetToken = user.createPasswordResetTokeen();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/resetPasswordMed/${resetToken}`;
  const message = `forget your password !!!  Submit a Patch request with ${resetURL} \n code : ${code} `;
  //console.log(user.email);
  try {
   // console.log(user.email);
    await sendEmail({
      email: user.email,
      subject: 'your password reset in 10 min',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'token send to email',
      data: [{resetToken, code}],
    });
  } catch (err) {
    user.createPasswordResetToken = undefined;
    user.createPasswordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    return  next(new AppError('not sent email', 500));
  }
});


exports.resetPasswordMed = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  //get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
console.log(req.params.token);
  const user1 = await Medical.findOne({
    passwordResetToken: hashedToken,
    PasswordResetExpires: { $gt: Date.now() },
  });
  console.log(hashedToken)
  //if token has not expired,and there is user,set the new password
  if (!user1) {
    return next(new AppError('Token is Invalid or has Expired', 400));
  }
  user1.password = await bcrypt.hash(req.body.password, salt);
  user1.PasswordResetToken = undefined;
  user1.PasswordResetExpires = undefined;
  await user1.save();
  //update changedPasswordAt property for user

  //log the user in send JWT
  createSendToken(user1, 200, res);
});



exports.sendpasswordMed = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  /*getting user based on his email*/
  
  const user = await Medical.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }
  await user.save({ validateBeforeSave: false });
 
  const newPassword = generateRandomPassword()
  const updatedUser = await Medical.findOneAndUpdate({ email: req.body.email }, {
    $set: {
        password: await bcrypt.hash(newPassword, salt)
    }
}, { lean: true })
  const message = `forget your password !!! \n  New password:  ${newPassword} \n To update this password you should navigate to reset password page in mobile app`;
  //console.log(user.email);
  try {
    await sendEmail({
      email: user.email,
      subject: 'your password reset in 10 min',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'token send to email',
    });
  } catch (err) {
    user.createPasswordResetToken = undefined;
    user.createPasswordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    return  next(new AppError('not sent email', 500));
  }
});


exports.updateMed = catchAsync( async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const updatedParent = await Medical.findOneAndUpdate({_id: req.params.id}
   , {$set: {
    email: req.body.email,
    adress: req.body.adress,
    lang: req.body.lang,
    phoneNumber: req.body.phoneNumber,
    tarifs: req.body.tarifs, 
    officePhone: req.body.officePhone,
    statut: req.body.statut,
    password:  await bcrypt.hash(req.body.password, salt)
   } }, {new: true});
   res.status(200).json({
      status: 'success',
      data: {
        updatedParent,
      },
    });
});
