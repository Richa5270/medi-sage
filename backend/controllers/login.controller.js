// create login controller using jwt token authentication and email and phonenumber
const { executeQuery } = require("../config/db.connection");
const {sign} = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, phone_number } = req.body;
    try {
        const query = `SELECT * FROM students WHERE email = ? AND phone_number = ?`;
        const result = await executeQuery(query, [email, phone_number]);
        if (result.length > 0) {
            const token = sign({ id:result[0].id }, process.env.SECRET_KEY, { expiresIn: "1h",
            });
            return res.status(200).json({
                message: "Login successfully",
                data: result,
                token: token,
            });
        } else {
            return res.status(400).json({
                message: "Invalid email or phone number",
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
        });
    }
};



module.exports = {
    login }