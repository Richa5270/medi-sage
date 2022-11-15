const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students.controller')

router.post('/addstudent', studentController.createStudents);
router.get('/search', studentController.searchStudents);
router.get('/getstudents', studentController.getStudents);
router.post('/updatestudent/:id', studentController.updateStudents);
router.get('/getstudent/:id', studentController.getStudentById);
router.delete('/deletestudent/:id', studentController.deleteStudents);
router.post('/uploadimage/:id', studentController.uploadImage);

module.exports = router;