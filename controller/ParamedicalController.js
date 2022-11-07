const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Paramedical = require('../models/Paramedical');
var ObjectID = require('mongodb').ObjectID
const catchAsync = require('../utils/catchAsync')
const bycrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const AppError = require('../config/appError');
const sendEmail = require('../config/email');

exports.addParamedical = async (req, res) => {
     // generate salt to hash password
     const salt = await bcrypt.genSalt(10);
    const paramedical = new Paramedical({
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
        password : await bcrypt.hash(req.body.password, salt)
    });


    try {
    const savedPara = await paramedical.save();
        res.json(savedPara);   }
        catch(err){
            res.json({message : err});
        } 
}
exports.allPara = catchAsync( async (req, res) => {
    //console.log("get paramedical fonction hereee !! ");
    Paramedical.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Paramedical",
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
                res.json("there is no paramedical staff ")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

exports.getparas = catchAsync( async (req, res) => {
    //console.log("get paramedical fonction hereee !! ");
    Paramedical.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Paramedical",
           }
         },
        
        { $sort : { rating : -1 } }
      //  { $project: { 'speciality_Doctor.Name': 1 } },
        ])
        .then((result) => {
            if(result.length == 0){
                res.json("there is no paramedical staff ")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});


exports.trydeletepara = catchAsync( async (req, res) => {
    
    const deletedmedical = await Paramedical.findOneAndRemove({_id: req.params.id})
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

exports.getDetailsPara = catchAsync( async (req, res) => {
 //   console.log("get details fonction hereee !! ");
    Paramedical.aggregate([
        { $lookup:
           {
            from: "specialities",
            localField: "speciality",
            foreignField: "_id",
            as: "speciality_Paramedical",
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
                res.json("there is no paramedical with this identifiant")
            }
            else {
                res.json(result);
            }
        })
        .catch((error) => {
          console.log(error);
        });
});

exports.sommepara = catchAsync( async (req, res) => {
    
    const doctors = await Paramedical.countDocuments();
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

exports.loginParamedical = async (req, res) => {
    const body = req.body;
    const paramedical = await Paramedical.findOne({ email: body.email });
    if (paramedical) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, paramedical.password);
      if (validPassword) {
       // res.status(200).json({ message: "Valid password" });
         //send token to the client
    const token = signToken(paramedical._id);
    const newmedical = await Paramedical.findByIdAndUpdate(
      paramedical._id,
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
exports.updatepasswordpara = catchAsync( async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const updatedPara = await Paramedical.findOneAndUpdate({_id: req.params.id}
   , {$set: {
     password:  await bcrypt.hash(req.body.password, salt)
   } }, {new: true});
   res.status(200).json({
      status: 'success',
      data: {
        updatedPara,
      },
    });
});


exports.forgotPasswordPara = catchAsync(async (req, res, next) => {
  /*getting user based on his email*/
  const code = generateRandomPassword()
  const user = await Paramedical.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }
  const resetToken = user.createPasswordResetTokennn();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/resetPasswordPara/${resetToken}`;
  const message = `forget your password !!!  Submit a Patch request with ${resetURL}  \n code : ${code}`;
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

exports.resetPasswordPara = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  //get user based on token
  const hashedToken = require('crypto')
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Paramedical.findOne({
    PasswordResetToken: hashedToken,
    PasswordResetExpires: { $gt: Date.now() },
  });
  console.log(hashedToken);
  //if token has not expired,and there is user,set the new password
  if (!user) {
    return next(new AppError('Token is Invalid or has Expired', 400));
  }
  user.password = await bcrypt.hash(req.body.password, salt);
  user.PasswordResetToken = undefined;
  user.PasswordResetExpires = undefined;
  await user.save();
  //update changedPasswordAt property for user

  //log the user in send JWT
  createSendToken(user, 200, res);
});

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



exports.sendpasswordPara = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  /*getting user based on his email*/
  
  const user = await Paramedical.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }
 
  await user.save({ validateBeforeSave: false });

  const newPassword = generateRandomPassword()
  const updatedUser = await Paramedical.findOneAndUpdate({ email: req.body.email }, {
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

exports.updatePara = catchAsync( async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const updatedPara = await Paramedical.findOneAndUpdate({_id: req.params.id}
   , {$set: {
    email: req.body.email,
    adress: req.body.adress,
    lang: req.body.lang,
    phoneNumber: req.body.phoneNumber,
    tarifs: req.body.tarifs, 
    officePhone: req.body.officePhone,
    password:  await bcrypt.hash(req.body.password, salt)
   } }, {new: true});
   res.status(200).json({
      status: 'success',
      data: {
        updatedPara,
      },
    });
});
