const mongoose = require('mongoose');

const TestAnswerSchema = mongoose.Schema({

     idTest: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true, 
     },
     idChild: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "childTND",
        required: true, 
     },
     isParent: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },

});
module.exports = mongoose.model('testAnwer', TestAnswerSchema);