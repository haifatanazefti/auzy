const express = require('express');
const router = express.Router();
const AvailablityController = require('../controller/AvailablityController');
router.post('/addplanning/:doctorId',AvailablityController.addPlanning);
router.post('/addplanningpara/:paramedicalId',AvailablityController.addPlanningPara);

router.get('/getplanning/:doctorId/:date',AvailablityController.getAllAvailiblities)
router.get('/getplanningpara/:paramedicalId/:date',AvailablityController.getAllAvailiblitiespara)

router.get('/getplanningfordoct/:doctorId/:date',AvailablityController.getplanningdoc)
router.get('/getplanninghistplanningdoct/:doctorId',AvailablityController.getallplanningdoc)
router.get('/getplanninghistplanningpara/:paramedicalId',AvailablityController.getallplanningpara)
router.get('/getplanningforpara/:paramedicalId/:date',AvailablityController.getplanningpara)

/* it works for : doctor and paramedical */
router.delete('/deleteav/:id',AvailablityController.deleteAvailiblty)
router.patch('/update/:ids',AvailablityController.updateSeance)
router.patch('/updateavdoct/:id',AvailablityController.updateAvailiblitydoct)
//router.patch('/updateapp/:ids',AvailablityController.updateSeanceForApp)
module.exports = router;