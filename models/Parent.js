const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isMobilePhone, isAlpha } = require("validator")
const crypto = require('crypto');
const ParentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: { validator: isAlpha , message: 'Invalid firstName format.' }
    },
    lastName: {
        type: String,
        required: true,
        validate: { validator: isAlpha , message: 'Invalid lastName format.' }
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
    town: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: { validator: isMobilePhone , message: 'Invalid Mobile phone.' }
    },
    birthDate: {
        type: Date,
        required: true,
        validate: { validator: isDate , message: 'Invalid date format.' }
    },
    gender: {
        type: String,
        required: true
    },
    // is wife or husband 
    role: {
        type: String,
        required: true,
    },
    // divorced, married or single
    maritalStatus: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    // blood relationship
    kinship: {
        type: String,
        required: true,
    },
    join_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    password: {
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

ParentSchema.methods.createPasswordResetTokenn = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
module.exports = mongoose.model('Parent', ParentSchema);