const { executeQuery } = require("../config/db.connection");
const studentModel = require("../models/student.model");
const axios = require("axios");
const multer = require("multer");

const endpoints = "https://restcountries.com/v2/callingcode/";

// Create student data
const createStudents = async (req, res) => {
  const { error } = studentModel(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    // fetch country data from API using country code endpint =https://restcountries.com/v2/callingcode/:id

    const countryCode = req.body.country_code;
    const countryData = await axios.get(`${endpoints}${countryCode}`);

    const countryName = countryData.data[0].name;

    const studentData = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: countryName,
      country_code: req.body.country_code,
    };
    try {
      const query = "INSERT INTO students SET ?";
      const result = await executeQuery(query, studentData);
      return res.status(200).json({
        message: "Student data created successfully",
        data: studentData,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }
  }
};

// global search student data from database
const searchStudents = async (req, res) => {
  console.log(req.query);
  const { search } = req.query;
  try {
    const query = `SELECT * FROM students WHERE name LIKE '%${search}%' OR email LIKE '%${search}%' OR phone_number LIKE '%${search}%' OR country LIKE '%${search}%' OR country_code LIKE '%${search}%'`;
    const result = await executeQuery(query);
    return res.status(200).json({
      message: "Student data fetched successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

// get all student data from database
const getStudents = async (req, res) => {
  try {
    const query = "SELECT * FROM students";
    const result = await executeQuery(query);
    return res.status(200).json({
      message: "Student data fetched successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

// get student data by id
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM students WHERE id = ?`;
    const result = await executeQuery(query, id);
    return res.status(200).json({
      message: "Student data fetched successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

// update student data
const updateStudents = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const { error } = studentModel(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    // fetch country data from API using country code endpint =https://restcountries.com/v2/callingcode/:id

    const countryCode = req.body.country_code;
    const countryData = await axios.get(`${endpoints}${countryCode}`);
    const countryName = countryData.data[0].name;
    const studentData = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: countryName,
      country_code: req.body.country_code,
    };
    try {
      const query = `UPDATE students SET ? WHERE id = ${req.params.id}`;
      const result = await executeQuery(query, studentData);
      return res.status(200).json({
        message: "Student data updated successfully",
        data: studentData,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }
  }
};

// delete student data
const deleteStudents = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM students WHERE id = ?`;
    const result = await executeQuery(query, id);
    return res.status(200).json({
      message: "Student data deleted successfully",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
// set storage engin
const upload = multer({
// save in binaray format
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// upload image
const uploadImage = async (req, res) => {
  const { id } = req.params;
  const { file } = req;
  console.log(file);
  if (!file) {
    return res.status(400).json({
      message: "Please upload image",
    });
  } else {
    try {
      const query = `UPDATE students SET image = ? WHERE id = ${id}`;
      const result = await executeQuery(query, file.buffer);
      return res.status(200).json({
        message: "Image uploaded successfully",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }
  }
};

//     storage: multer.diskStorage({
//     destination:(req, file, cb)=> {
//       cb(null, "uploads/")
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname +"_" + Date.now() + ".jpg"||".png"||".jpeg");
//     }
//   })
// }).single("student_image");
// // insert student image in database using multer
// const uploadImage = async (req, res) => {
//   console.log(req.file);
//   const studentImage = {
//     image: req.file.filename
//   };
//   try {
//     //uopdate image in database
//     const query = `UPDATE students SET ? WHERE id = ${req.params.id}`;
//     const result = await executeQuery(query,studentImage);
//     return res.status(200).json({
//       message: "Student image uploaded successfully",
//       data: studentImage,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error: err,
//     });  
//     }
//   };



  // res.send("Image uploaded successfully");



  // }



module.exports = {
  createStudents,
  searchStudents,
  getStudents,
  updateStudents,
  getStudentById,
  deleteStudents,
  uploadImage,
  upload
};

