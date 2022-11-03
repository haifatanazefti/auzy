const mongoose = require('mongoose');

const ConsultationSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    childId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "ChildTND",
        required: true, 
     },
     doctorId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Medical",
        required: false, 
     },
     paramedicalId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "Paramedical",
      required: false, 
   },
     childcomp: {
        type:  String,
        required: false, 
     },
     observation: {
        type: String,
        required: false,
     },
     recomm: {
        type: String,
        required: false,
     },
     followup: {
        type: String,
        required: false,
     }

     

});
module.exports = mongoose.model('consultation', ConsultationSchema);