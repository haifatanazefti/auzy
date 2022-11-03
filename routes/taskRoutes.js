const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');
router.post('/addtask',taskController.addTask);
router.patch('/donetask/:id',taskController.doneTask)
module.exports = router;