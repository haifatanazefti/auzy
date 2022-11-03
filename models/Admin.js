const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")
const crypto = require('crypto');

const adminchema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        validate: { validator: isEmail , message: 'Invalid email.' }
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

adminchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
module.exports = mongoose.model('admin', adminchema);