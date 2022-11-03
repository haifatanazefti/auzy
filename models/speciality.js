const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const specialitySchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    // category =>  0: medical and 1: paramedical
    category: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true,
    }

});
module.exports = mongoose.model('speciality', specialitySchema);