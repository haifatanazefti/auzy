const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isMobilePhone } = require("validator")
const crypto = require('crypto');
const DoctorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: { validator: isEmail , message: 'Invalid email.' }
    },
    adress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: { validator: isMobilePhone , message: 'Invalid Mobile phone.' }
    },
    birthdate: {
        type: Date,
        required: true,
        validate: { validator: isDate , message: 'Invalid date format.' }
    },
    gender: {
        type: String,
        required: true
    },
    statut: {
        type: String,
        required: false,
        default: null
    },
    speciality: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "speciality",
        required: true, 
    },
    officePhone: {
        type: String,
        required: true,
        validate: { validator: isMobilePhone , message: 'Invalid Offcie phone.' }
    },
    joinDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    rating :{
        type: Number,
        required: true,
        default:0
    },
    infos: {
        type: String,
        required: false,
        default: "doctors  have a key role in coordinating and recommending therapeutic (rehabilitation) and drug interventions for children with neurodevelopmental disorders (specific learning or developmental disorders)."
    },
    tarifs :{
        type: String,
        required: false,
        default: null
    },
    lang :{
        type: String,
        required: false,
        default: null
    },
    password:{
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    
});

DoctorSchema.methods.createPasswordResetTokeen = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
module.exports = mongoose.model('Medical', DoctorSchema);