//model
const Joi = require('joi');



const studentModel = (studentData) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone_number: Joi.number().integer().min(1000000000).max(9999999999).required(),
        country_code: Joi.string().min(1).max(3).required()
    });
    return schema.validate(studentData);
}

module.exports = studentModel;

