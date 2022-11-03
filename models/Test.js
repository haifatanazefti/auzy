const mongoose = require('mongoose');

const Testschema = mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    typeAlgo: {
        type: String,
        required: false,
    },
    
  
});
module.exports = mongoose.model('test', Testschema);