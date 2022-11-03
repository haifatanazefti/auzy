const mongoose = require('mongoose');
const DisordersTND = require('../models/disordersTND')
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")
//const childSchema = new Schema({ name: 'string' });

const ChildSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: { validator: isAlpha , message: 'Invalid fisrtName format.' }
    },
    lastName: {
        type: String,
        required: true,
        validate: { validator: isAlpha , message: 'Invalid lastName format.' }
    },
    birthDate: {
        type: Date,
        required: true,
       // validate: { validator: isDate , message: 'Invalid date format.' }
    },
    gender: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    numberBrothers: {
        type: Number,
        required: true
    },
   
    // refers to the parent id 
    parent: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true, 
     },
     //"DisordersTND" : ["624ed2b6014bcbd3c0fc3622","624ed427076060e94807bc8f"]
    DisordersTND: [{ type : mongoose.Schema.Types.ObjectId,
         ref: 'disordersTND',
         default: null }],
  
    birthweight: {
        type: Number,
        required: false,
        default: null
        }, 
    gista_age: {
        type: String,
        required: false,
        default: null
        }, 
    type_birth: {
        type: String,
        required: false,
        default: null
            }, 

     presentation: {
        type: String,
        required: false,
        default: null
                    },
      feeding_meth: {
            type: String,
            required: false,
            default: null
            },
     
      chronics: [{ type : mongoose.Schema.Types.ObjectId,
                ref: 'chronics',
                default: null }],
        
    

});
module.exports = mongoose.model('ChildTND', ChildSchema);