/*const express = require('express');
const Parent = require('../models/Parent');
const Allergie = require('../models/Allergie');
const catchAsync = require('../utils/catchAsync')
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


exports.forgetpassword = async (Request,Response)=> {
  try {
   

     userdata = await Parent.findOne({ email: Request.body.email });
    if (!userdata)
        return Response.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: userdata._id });
    if (!token) {
        token = await new Token({
            userId: userdata._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
    }

    link = `${process.env.BASE_URL}/password-reset/${userdata._id}/${token.token}`;
    await sendEmail(userdata.email, "Password reset", link);

    Response.send("password reset link sent to your email account");
} catch (error) {
    Response.send("An error occured");
    console.log(error);
}
}


exports.resetpassword =async(Request,Response)=> {
  try {
    

     userdata = await user.findById(Request.params.userId);
    if (!userdata) return Response.status(404).send("invalid link or expired");

     token = await Token.findOne({
        userId: userdata._id,
        token: Request.params.token,
    });
    if (!token) return Response.status(404).send("Invalid link or expired");
    const salt = await bcrypt.genSalt(10);
     hashPassword = await bcrypt.hash(Request.body.password, salt);
    userdata.hash_password = hashPassword;
    await userdata.save();
    await token.delete();

    Response.send("password reset sucessfully.");
} catch (error) {
    Response.send("An error occured");
    console.log(error);
}
}*/