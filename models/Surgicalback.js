const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const surgicalbackchema = mongoose.Schema({
    surgeyName: {
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
module.exports = mongoose.model('surgicalback', surgicalbackchema);