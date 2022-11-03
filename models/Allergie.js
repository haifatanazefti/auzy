const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const allergiechema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    
    note: {
        type: String,
        required: false,
    },
    child: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "ChildTND",
        required: true, 
     },
    

});
module.exports = mongoose.model('allergy', allergiechema);