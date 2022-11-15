const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students.controller')
const loginController = require('../controllers/login.controller')
var fileupload = require("express-fileupload");
const { checkToken } = require('../middlewares/auth');


router.post('/login', loginController.login);
router.post('/addstudent', studentController.createStudents);


router.use(checkToken);
router.get('/getstudents', studentController.getStudents);
router.get('/search', studentController.searchStudents);
router.post('/updatestudent/:id', studentController.updateStudents);
router.get('/getstudent/:id', studentController.getStudentById);
router.delete('/deletestudent/:id', studentController.deleteStudents);


router.use(fileupload());
router.post('/uploadimage/:id', studentController.uploadImage);

module.exports = router;