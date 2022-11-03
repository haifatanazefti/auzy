const mongoose = require('mongoose');

const QuestionAngschema = mongoose.Schema({
    Text: {
        type: String,
        required: true,
    },
    idquestion: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true, 
     },
});
module.exports = mongoose.model('questionang', QuestionAngschema);