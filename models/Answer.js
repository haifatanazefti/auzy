const mongoose = require('mongoose');
//const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const answerchema = mongoose.Schema({
   
    idQuest: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true, 
     },
     idtestAnswer: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "TestAnswer",
        required: true, 
     },
      value: {
        type: Number,
        required: false,
    },

    
    

});
module.exports = mongoose.model('answer', answerchema);