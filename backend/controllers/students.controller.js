const { executeQuery } = require("../config/db.connection");
const studentModel = require("../models/student.model");
const axios = require("axios");

const endpoints = "https://restcountries.com/v2/callingcode/";

// Create student data
const createStudents = async (req, res) => {
  const { error } = studentModel(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    // fetch country data from API using country code endpint =https://restcountries.com/v2/callingcode/:id

    const countryCode = req.body.country_code;
    let countryName = "";
    try {
      const countryData = await axios.get(`${endpoints}${countryCode}`);
      countryName = countryData.data[0].name;
    } catch (error) {
      return res.status(400).send("Invalid country code");
    }



    const studentData = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: countryName,
      country_code: req.body.country_code,
    };
    try {
      
      if ((await executeQuery(`SELECT * FROM students WHERE email = ?`, [req.body.email])).length > 0) {
        return res.status(400).json({message: "Student email already exist with other user",});
      }
      if ((await executeQuery(`SELECT * FROM students WHERE phone_number = ?`, [req.body.phone_number])).length > 0) {
        return res.status(400).json({message: "Student phone number already exist with other user",});
      }


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
      updatedAt: new Date(),
    };
    try {
      if ((await executeQuery(`SELECT * FROM students WHERE email = ? AND id != ?`, [req.body.email,req.params.id,])).length > 0) {
        return res.status(400).json({message: "Student email already exist with other user",});
      }
      if ((await executeQuery(`SELECT * FROM students WHERE phone_number = ? AND id != ?`, [req.body.phone_number,req.params.id,])).length > 0) {
        return res.status(400).json({message: "Student phone number already exist with other user",});
      }

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

// upload image
const uploadImage = async (req, res) => {
  const { id } = req.params;
  var file = req.files;
  if (!file || !file.image) {
    return res.status(400).json({
      message: "Please upload image",
    });
  } else {
    file = file.image;
    if (file.size > 500000) {
      return res.status(400).json({message: "File size is larger than 500kb"});
    }

    if (file.mimetype !== "image/png" &&file.mimetype !== "image/jpg" &&file.mimetype !== "image/jpeg"  ) {
      return res.status(400).json({message: "File type is not supported"});
    }



    try {

      const query = `UPDATE students SET ? WHERE id = ${id}`;
      let updateImage = {
        image: file.data.toString('base64'),
        updatedAt: new Date()
      }
      const result = await executeQuery(query, updateImage);
      return res.status(200).json({
        message: "Image uploaded successfully",
        data: result,
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }
  }
};

module.exports = {
  createStudents,
  searchStudents,
  getStudents,
  updateStudents,
  getStudentById,
  deleteStudents,
  uploadImage,
};

