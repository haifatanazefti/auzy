const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const AvailablitySchema = mongoose.Schema({
   /* listAvailablity: [{
        date: {
            type: Date,
            required: true,
            validate: { validator: isDate , message: 'Invalid date format.' }
        },
        time: {
            type: String,
            required: true,
        }, 
        // Boolean => 0 for online and 1 for office
        type: {
            type: Boolean,
            required: true,
        },
      
    }],
*/
    date: {
        type: Date,
        required: true,
        validate: { validator: isDate , message: 'Invalid date format.' }
    },
    // 0 : seance dispo - 1 : seance non dispo
    statut : {
        type: Boolean,
        default:0,
        required: true
    },
    time: {
        type: String,
        required: true,
    }, 
    endtime: {
        type: String,
        required: true,
    }, 
// Boolean => 0 for online and 1 for office
    type: {
        type: Boolean,
        required: true,
    },
    background: {
        type: String,
        required:true
    },

    // refers to the doctor id 
    doctorId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Medical",
        required: false, 
     },
     paramedicalId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Paramedical",
        required: false, 
     },
    

});
module.exports = mongoose.model('Planning', AvailablitySchema);