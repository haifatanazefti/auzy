const express = require('express');
const router = express.Router();
const Parent = require('../models/Parent')
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const AppError = require('../config/appError');
const sendEmail = require('../config/email');
exports.addParent = async (req, res) => {
     // generate salt to hash password
     const salt = await bcrypt.genSaltSync(10);
    const parent = new Parent({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        adress: req.body.adress,
        town: req.body.town,
        phoneNumber: req.body.phoneNumber,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        role: req.body.role,
        maritalStatus: req.body.maritalStatus,
        job: req.body.job,
        kinship: req.body.kinship,
        password:  await bcrypt.hash(req.body.password, salt)
    });
    try {
      
        const parentExists = await Parent.exists({ email: req.body.email});
            if(parentExists)

                 {res.status(400).send('email exist!!');}

            else {
              const savedParent = await parent.save();
              res.json(savedParent); 
     }
    }
       
        catch(err){
            res.json({message : err});
        } 
}

exports.getParents = catchAsync( async (req, res) => {
    const parents = await Parent.find();
    res.json(parents);

});

// Get the adress of the parent to reference the adress of the doctors when he chooses to book an app
exports.getParentAdress = catchAsync( async (req, res) => {
    const parent = await Parent.findById(req.params.id).select('town');
    if(!parent) {
        res.json("there is no parent with this Id")
    }
    else {
        res.json(parent);
    }
    

});
exports.getParent = catchAsync(async (req, res) => {
    
    const parent = await Parent.find({_id: req.params.id});
    if(!parent) {
        res.json("there is no parent with this Id")
    }
    else {
        res.json(parent);
    }
});
exports.deleteuser = catchAsync( async (req, res) => {
    
    const deletedmedical = await Parent.findOneAndRemove({_id: req.params.id})
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


exports.somme = catchAsync( async (req, res) => {
    
    const doctors = await Parent.countDocuments();
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

exports.loginParent = catchAsync(async (req, res) => {
    const body = req.body;
    const parent = await Parent.findOne({ email: body.email });
    if (parent) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, parent.password);
      if (validPassword) {
       // res.status(200).json({ message: "Valid password" });
         //send token to the client
    const token = signToken(parent._id);
    const newparent = await Parent.findByIdAndUpdate(
      parent._id,
      {
        token: token,
      },
      { new: true }
    );
    createSendToken(newparent, 200, res);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  
});

exports.updateParent = catchAsync( async (req, res) => {
  //const salt = await bcrypt.genSalt(10);
  const updatedParent = await Parent.findOneAndUpdate({_id: req.params.id}
   , {$set: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    adress: req.body.adress,
    town: req.body.town,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate, 
    maritalStatus: req.body.maritalStatus,
    job: req.body.job
   } }, {new: true});
   res.status(200).json({
      status: 'success',
      data: {
        updatedParent,
      },
    });
});

exports.updatepassword = catchAsync( async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const updatedParent = await Parent.findOneAndUpdate({_id: req.params.id}
   , {$set: {
     password:  await bcrypt.hash(req.body.password, salt)
   } }, {new: true});
   res.status(200).json({
      status: 'success',
      data: {
        updatedParent,
      },
    });
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

exports.forgotPasswordP = catchAsync(async (req, res, next) => {
  const code = generateRandomPassword()
  /*getting user based on his email*/
  const user = await Parent.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }
  const resetToken = user.createPasswordResetTokenn();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/resetPasswordP/${resetToken}`;
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

exports.resetPassword = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  //get user based on token
  const hashedToken = require('crypto')
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Parent.findOne({
    PasswordResetToken: hashedToken,
    PasswordResetExpires: { $gt: Date.now() },
  });
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






exports.sendpassword = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  /*getting user based on his email*/
  
  const user = await Parent.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }
  const resetToken = user.createPasswordResetTokenn();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/resetPassword/${resetToken}`;
  const newPassword = generateRandomPassword()
  const updatedUser = await Parent.findOneAndUpdate({ mail: req.params.mail }, {
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
