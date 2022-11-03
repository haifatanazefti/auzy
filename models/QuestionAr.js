const mongoose = require('mongoose');

const QuestionArbschema = mongoose.Schema({
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
module.exports = mongoose.model('questionarb', QuestionArbschema);