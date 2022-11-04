const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
const connectDB = require('./config/db.js')
// load config
dotenv.config({path: './config/config.env'})
connectDB();

app.use(cors());
const router = express.Router();
// app.use(bodyParser.json());

// import  routes for the doctor
const doctorRoute = require('./routes/MedicalRoutes');
app.use('/api', doctorRoute);

// import  routes for the moodlog
const MoodRoute = require('./routes/MoodLogRoutes');
app.use('/api', MoodRoute);

// import  routes for the parents
 const parentRoutes = require('./routes/ParentRoutes');
app.use('/api', parentRoutes);

// import  routes for the child
const childRoutes = require('./routes/ChildTNDRoutes');
app.use('/api', childRoutes);

// import  routes for the disorders
//const disordersRoutes = require('./routes/disordersTNDRoutes');
//app.use('/api', disordersRoutes);

// import  routes for the planning
const planningRoutes = require('./routes/AvailablityRoutes');
app.use('/api', planningRoutes);

// import  routes for the appointments
const appointmntsRoutes = require('./routes/AppointmentRoutes');
app.use('/api', appointmntsRoutes);

// import  routes for the appointments
const SpecialityRoutes = require('./routes/specialitiesRoutes');
app.use('/api', SpecialityRoutes);

// import  routes for the consultation
const consultRoutes = require('./routes/consultationRoutes');
app.use('/api', consultRoutes);

// import  routes for the observation
const observationRoutes = require('./routes/observationRoutes');
app.use('/api', observationRoutes);

// import  routes for the observation
const paramedicalRoutes = require('./routes/paramedicalRoutes');
app.use('/api', paramedicalRoutes);

const medbackRoutes = require('./routes/medbackRoutes');
app.use('/api', medbackRoutes);


const surgbackRoutes = require('./routes/SurgicalRoutes');
app.use('/api', surgbackRoutes);

const fammedbackRoutes = require('./routes/fammedbackRoutes');
app.use('/api', fammedbackRoutes);

const vaccineRoutes = require('./routes/vaccineRoutes');
app.use('/api', vaccineRoutes);

const allergieRoutes = require('./routes/allergiesRoutes');
app.use('/api', allergieRoutes);


const chronicRoutes = require('./routes/chrronicRoutes');
app.use('/api', chronicRoutes);

const DrugRoutes = require('./routes/DrugRoutes');
app.use('/api', DrugRoutes);
const ligneRoutes = require('./routes/ligneordRoutes');
app.use('/api', ligneRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api', taskRoutes);

const testRoutes = require('./routes/TestRoutes');
app.use('/api', testRoutes);

const questionRoutes = require('./routes/questionRoutes');
app.use('/api', questionRoutes);

const answerRoutes = require('./routes/answerRoutes');
app.use('/api', answerRoutes);


const testanswerRoutes = require('./routes/testAnswerRoutes');
app.use('/api', testanswerRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api', adminRoutes);

//pour accepter le requet des route distinct 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.listen(process.env.PORT || 3000)
