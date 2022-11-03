const mongoose = require('mongoose');

const Questionschema = mongoose.Schema({
    order: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    idTest: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true, 
     },
});
module.exports = mongoose.model('question', Questionschema);