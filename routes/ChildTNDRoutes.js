const express = require('express');
const router = express.Router();
const childTNDController = require('../controller/childTNDController');
router.post('/addchild/:parent',childTNDController.addChild);
router.get('/getchilds/:parent',childTNDController.getChildrens)
router.patch('/upchild/:id',childTNDController.updateechild)
router.get('/getchildrens/:parent',childTNDController.allchildrens)
router.get('/getDisorders/:id',childTNDController.GetDisoders)
router.get('/getchild/:id',childTNDController.getDetails)
router.delete('/deletechild/:id',childTNDController.deleteChild)
router.put('/updatechild/:id',childTNDController.updateChild)
router.get('/autism',childTNDController.autism)
router.get('/adhd',childTNDController.adhd)
router.get('/intellectual',childTNDController.intellectual)
router.get('/hyper',childTNDController.hyper)
router.get('/learning',childTNDController.learning)
router.get('/childs',childTNDController.sommechilds)
router.patch('/adddisorders/:id',childTNDController.adddisorders)
router.patch('/deletedisorders/:id',childTNDController.deletedisorders)
router.patch('/addchronic/:id',childTNDController.addchronics)
router.patch('/deletechronic/:id',childTNDController.deletechronics)

module.exports = router;
