const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const vaccineschema = mongoose.Schema({
    vacname: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
    sideffects: {
        type: String,
        required: false,
    },
    
    child: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "ChildTND",
        required: true, 
     },
    

});
module.exports = mongoose.model('vaccine', vaccineschema);