const mongoose = require('mongoose');

// lezeem nzzidd id user 


const MoodLogSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
    trigger: {
        type: String,
        required: true
    },
    reaction: {
        type: String,
        required: false
    },
    background: {
        type: String,
        required:true
    },
    audio: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    // refers to the child id 
    childId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "ChildTND",
        required: true, 
     }
});
module.exports = mongoose.model('MoodLog', MoodLogSchema);