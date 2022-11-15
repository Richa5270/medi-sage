const express = require('express');
const router = express.Router();
const studentRoute = require('./students.router');

router.use('/v1', studentRoute);



module.exports = router;