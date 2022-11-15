import React from "react";
import "./login.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const[phone_number, setPhone_number] = useState("");


  // login form validation
  const login = (e) => {
    e.preventDefault();
    const data = {
      email: email, 
      phone_number: phone_number  
    };
    console.log(data);
    axios.post ("http://localhost:8082/v1/login", data)
    .then((res) => {  
      console.log(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      alert("Invailid Credentials")
    })
  };
  


  function handleClick() {
    navigate("/register");
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
              name="userName"
              id="userName"
              placeholder="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="mobile"
              value={phone_number} onChange={(e) => setPhone_number(e.target.value)}
            />
          </div>
          <button class="btn mt-3"
          
          onClick={login}
          >Login</button>
        </form>
        <div class="text-center fs-6">
          <span onClick={handleClick} style={{cursor:'pointer'}}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
