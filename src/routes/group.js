const express = require('express');
const groupController = require('../controllers/group');
const classRouter = require('./class');

const router = express.Router();

// RESTful API
router
  .route('/')
  .get(groupController.getAllGroups)
  .post(groupController.createGroup);

router
  .route('/:groupId')
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup);

router.use('/:groupId/classes', classRouter);

module.exports = router;
