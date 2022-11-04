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


//pour accepter le requet des route distinct 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.listen(3000)
