const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const ObservationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
     consultId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "consultation",
        required: true, 
     },

});
module.exports = mongoose.model('observation', ObservationSchema);