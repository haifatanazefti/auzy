const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const medicalbackchema = mongoose.Schema({
    medecineName: {
        type: String,
        required: false,
    },
    duration: {
        type: String,
        required: false,
    },
    days: {
        type: String,
        required: false,
    },
    currentUse: {
        type: String,
        required: false,
    },
    child: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "ChildTND",
        required: true, 
     },
    

});
module.exports = mongoose.model('medicalback', medicalbackchema);