const express = require('express');
const router = express.Router();
const ligneController = require('../controller/ligneordController');
router.post('/addligne',ligneController.addlord);
//router.get('/getallspec',specialityController.getAllSpecialitiesPara)
//router.get('/getallback/:child',medicalbackController.getAllmedbackChild)
//router.get('/vaccines/:child',vaccineController.getal)
router.get('/getrem/:child',ligneController.getdetailsreminder)
router.get('/getr/:id',ligneController.getdetails)
module.exports = router;