const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const disordersTNDSchema = mongoose.Schema({
    Name: {
        type: String,
        required: false,
    },

});
module.exports = mongoose.model('disordersTND', disordersTNDSchema);