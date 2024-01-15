const express = require('express');
const classController = require('../controllers/class');
const studentRouter = require('./student');

const router = express.Router({ mergeParams: true }); // Important for accessing parent route params

router
  .route('/')
  .get(classController.getAllClasses)
  .post(classController.createClass);

router
  .route('/:classId')
  .get(classController.getClass)
  .patch(classController.updateClass)
  .delete(classController.deleteClass);

router.use('/:classId/students', studentRouter);

module.exports = router;
