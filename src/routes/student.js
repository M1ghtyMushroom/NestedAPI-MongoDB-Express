const express = require('express');
const studentController = require('../controllers/student');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);
router
  .route('/:studentId')
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);

module.exports = router;
