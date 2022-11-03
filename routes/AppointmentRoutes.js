const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/AppointmentController');

router.post('/addapp/:ParentId',appointmentController.addApp);
router.post('/addappara/:ParentId',appointmentController.addApppara);

router.get('/getallapp/:ParentId',appointmentController.getAllConfirmedAppointmentsPatient)
router.get('/getallappara/:ParentId',appointmentController.getAllConfirmedAppointmentsPatientPara)


router.get('/getallappdoctor/:doctorId',appointmentController.confdoc)
router.get('/getallapconfirmedpara/:paramedicalId',appointmentController.getAllConfirmedAppointmentsPara)


router.get('/getallwaitapp/:ParentId',appointmentController.getAllWaitingAppointmentsPatient)

router.get('/getallwaitappdoctor/:doctorId',appointmentController.getAllWaitingAppointmentsDoctor)
router.get('/getallwaitappara/:paramedicalId',appointmentController.getAllWaitingAppointmentsPara)

router.get('/getpatients/:doctorId',appointmentController.getPatientsDoc)
router.get('/getpatientspara/:paramedicalId',appointmentController.getPatientPara)


/*router.get('/getDisorders/:id',childTNDController.GetDisoders)
router.get('/getchild/:id',childTNDController.getDetails)*/
router.get('/detailsAppdoct/:id',appointmentController.getDetailsDoctorApp)
router.get('/detailsApp/:id',appointmentController.getDetailsPatientApp)
router.get('/detailsAppara/:id',appointmentController.getDetailsPatientAppara)
router.delete('/cancelapp/:id',appointmentController.cancelAppointment)
router.patch('/confirmapp/:id',appointmentController.confirmAppoitment)
module.exports = router;