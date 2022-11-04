const express = require('express');
const Admin = require('../models/Admin');
const Allergie = require('../models/Allergie');
const catchAsync = require('../utils/catchAsync')
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const sendEmail = require('../config/email');
const AppError = require('../config/appError');

exports.addadmin = async (req, res) => {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const savedadmin = new Admin({
        name: "AUZY mental health",
        email: req.body.email,
        password:  await bcrypt.hash(req.body.password, salt)

    });
    
    try {
    const admin = await savedadmin.save();
        res.json(admin);  
     }
        catch(err){
            res.json({message : err});
        } 
}

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


exports.loginadmin = async (req, res) => {
    const body = req.body;
    const admin = await Admin.findOne({ email: body.email });
    if (admin) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, admin.password);
      if (validPassword) {
       // res.status(200).json({ message: "Valid password" });
         //send token to the client
    const token = signToken(admin._id);
    const newuser = await Admin.findByIdAndUpdate(
      admin._id,
      {
        token: token,
      },
      { new: true }
    );
    createSendToken(newuser, 200, res);
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  
}
exports.findAdmin = catchAsync( async (req, res) => {
    
  const admindetails = await Admin.find({_id: req.params.id });
      res.json(admindetails);
  

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


/*
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  /*getting user based on his email*/
  /*
  const user = await Admin.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/resetPassword/${resetToken}`;
  const newPassword = generateRandomPassword()
  const updatedUser = await Admin.findOneAndUpdate({ mail: req.params.mail }, {
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
*/
/*exports.newpassword = catchAsync( async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const updatedAdmin = await Admin.findOneAndUpdate({password: req.body.password}
   , {$set: {
     password:  await bcrypt.hash(req.body.newpassword, salt)
   } }, {new: true});
   res.status(200).json({
      status: 'success',
      data: {
        updatedAdmin,
      },
    });
});*/


//Implementing a function that indicates forgot password
/*exports.forgotPassword = catchAsync(async (req, res, next) => {
  /*getting user based on his email*/
 /* const user = await Admin.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user with that email', 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/resetPassword/${resetToken}`;
  const message = `forget your password !!!  Submit a Patch request with ${resetURL} `;
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
      data: resetToken,
    });
  } catch (err) {
    user.createPasswordResetToken = undefined;
    user.createPasswordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    
    return  next(new AppError('not sent email', 500));
  }
});
*/

/*
exports.resetPassword = catchAsync(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  //get user based on token
  const hashedToken = require('crypto')
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Admin.findOne({
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
*/
/*

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

  //starting signing-up

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      tel: req.body.tel,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);
    const user = await User.findByIdAndUpdate(
      newUser._id,
      {
        token: token,
      },
      { new: true }
    );
  
    createSendToken(user, 201, res);
  });
//starting signing-in
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    //checking for email existance
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
    //check if user exist && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      //checking if the user is incorrect then cheching for password
      return next(new AppError('Incorrect email or password', 401));
    }
  
    //send token to the client
    const token = signToken(user._id);
    const newuser = await User.findByIdAndUpdate(
      user._id,
      {
        token: token,
      },
      { new: true }
    );
    createSendToken(newuser, 200, res);
  });
  
  //creating a log_out
  exports.logout = (req, res) => {};  */
