const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const familymedicalbackchema = mongoose.Schema({
    disname: {
        type: String,
        required: false,
    },
    kinship: {
        type: String,
        required: false,
    },
    
    child: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "ChildTND",
        required: true, 
     },
    

});
module.exports = mongoose.model('familymedback', familymedicalbackchema);