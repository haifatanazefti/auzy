const mongoose = require('mongoose');
const { isEmail, isEmpty, isDate, isAlpha } = require("validator")

const AppointmentSchema = mongoose.Schema({
    // refers to the parent id 
    ParentId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Parent",
        required: true, 
     },
      // refers to the doctor id 
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
     avId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "Availablity",
        required: true, 
     },
     /* type means : medical or paramedical  appointment */
    type: {
        type:  String,
        required: true, 
     },
       // Char means : e => Seance en attente, c => confirmed 
       status: {
         type: String,
         maxlength: 1,
         default: "e"
     },
     childId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "ChildTND",
      required: true, 
   }

});
module.exports = mongoose.model('Appointment', AppointmentSchema);