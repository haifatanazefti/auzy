const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const Drugschema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
   
});
module.exports = mongoose.model('Drug', Drugschema);