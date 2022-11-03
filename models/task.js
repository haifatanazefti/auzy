const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const TaskSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: false,
        default: false
    },
     consultId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "consultation",
        required: true, 
     },

});
module.exports = mongoose.model('task', TaskSchema);