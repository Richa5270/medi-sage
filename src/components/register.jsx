import React from 'react'
import "./login.css"

//create login form
const Register = () => {
    return (
        <div>
           <div class="wrapper">
        <div class="logo">
            <img src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt=""/>
        </div>
        <div class="text-center mt-4 name">
            Student
        </div>
        <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <input type="text" name="userName" id="userName" placeholder="name"/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="email"/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="phone no"/>
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="country Code"/>
            </div>
            <button class="btn mt-3">Register</button>
        </form>
        <div class="text-center fs-6">
              <a href="/login">Login</a>
        </div>
    </div>
        </div>
    )
}


export default Register;

