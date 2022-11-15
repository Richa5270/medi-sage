import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    country_code: "",
    phone_number : "",
  });

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  const navigate = useNavigate();
  function goToLogin() {
    navigate("/login");
  }

  var register = () => {
    fetch("http://localhost:8082/v1/addstudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>  res.text())
      .then((data) => {
        try {
            data = JSON.parse(data);
            if (data.message === "Student data created successfully") {
                alert("Registered Successfully");
                navigate("/login");
              } else {
                alert(data.message);
              }
        } catch (error) {
            alert(data)
        }
      });
  }
  return (
    <div>
      <div class="wrapper">
        <div class="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt=""
          />
        </div>
        <div class="text-center mt-4 name">Student</div>
        <form class="p-3 mt-3">
          <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={handleChange}
            />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input
              type="text"
              name="phone_number"
              placeholder="phone no"
              onChange={handleChange}
            />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input
              type="text"
              name="country_code"
              placeholder="country Code"
              onChange={handleChange}
            />
          </div>
        </form>
          <button class="btn mb-3" onClick={register} >Register</button>
        <div class="text-center fs-6">
          <span onClick={goToLogin} style={{cursor:'pointer'}}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
