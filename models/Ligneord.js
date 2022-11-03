const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const ligneschema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    nbrtimes: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: true,
    },
    datedebut: {
        type: Date,
        required: true,
    },
    datefin: {
        type: Date,
        required: true,
    },
    
    
    drugId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Drug",
        required: true, 
     },
     child: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "ChildTND",
        required: true, 
     },
    
    

});
module.exports = mongoose.model('ligneord', ligneschema);