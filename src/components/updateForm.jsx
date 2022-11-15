
// create a user registration form with profile picture
// Path: frontend\src\components\register.jsx
// Compare this snippet from frontend2\src\components\register.jsx:
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

// update data from table using endpoint
let endpint = "http://localhost:8082/v1/";



const UpdateForm = () => {
    
    
    const id = useParams()
    console.log(id)
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [mobile, setMobile] = useState('');  
    const [countryCode, setCountryCode] = useState('');
    const[image, setImage]=useState('');

    // const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(endpint + "getStudent/" + id.id)
            .then((res) => {
                setData(res.data.data[0]);
                setName(res.data.data[0].name);
                setEmail(res.data.data[0].email);
                setMobile(res.data.data[0].phone_number);
                setCountryCode(res.data.data[0].country_code);
                setImage(res.data.data[0].image);


            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    
  
    // update data in table using endpoint
    const updateData = (e) => {
        // e.preventDefault();
        const data = {
            name: name,
            email: email,
            phone_number: mobile,
            country_code: countryCode
        }
        console.log(data)
        axios.post(endpint + "updatestudent/" + id.id, data)
            .then((res) => {
                console.log(res);
                // redirect to update form
                window.location.href = "/";

                // window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
       
    }

// update image in table using endpoint



    const updateImage = (e) => {
        console.log(e.target.files[0])
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        
        console.log(id, 'id')
       setTimeout(() => {
        axios.post(endpint + "uploadimage/" + id.id, formData)
        .then((res) => {
            console.log(res);
            // redirect to update form
            window.location.href = "/";

            // window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
       }, 1000);



    }


   
// update image in database using endpoint
    const updateImageDB = (e) => {

    console.log(image)
        

        // axios.post(endpint + "updateimage/" + id.id, data)
        //     .then((res) => {
        //         console.log(res);
        //         // redirect to update form
        //         window.location.href = "/";
        //         // window.location.reload();
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })

    }

    // create a user registration form with profile picture with react
    return (
        <><div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
            <div class="col-md-3 border-right">
            
                <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5"
                        src={"uploads\\"+image}/><span
                        class="font-weight-bold"></span><span>
                            {/* browse file */}
                            <input type="file" name="file" id="file" class="inputfile" 
                            //auto upload image on change
                            onChange={(e) => updateImage(e)}
                            
                            />
                            <button type="submit" 
                            // update image in database
                            onClick={(e) => { updateImageDB(e); }}
                            
                            
                            >Upload</button>

                            {/* <label for="file">Choose a file</label> */}

                    </span></div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control"
                                placeholder="first name" 
                                // value onChange function and also show old data
                                value={name} onChange={(e) => setName(e.target.value)}
                                
                               
                                /></div>
                        <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control"
                                placeholder="enter email id" 
                                // value onChange function
                                value={email}  
                                 onChange={(e) => { setEmail(e.target.value) }}
                                /></div>
                        <div class="col-md-12"><label class="labels">PhoneNumber</label><input type="text"
                                class="form-control" placeholder="enter phone number" 
                                // value onChange function
                                value={mobile}
                                onChange={(e) => { setMobile(e.target.value) }}
                                /></div>
                        <div class="col-md-12"><label class="labels">Country Code</label><input type="text"
                                class="form-control" placeholder="enter phone number"
                                // value onChange function
                                value={countryCode} 
                                  onChange={(e) => { setCountryCode(e.target.value) }}
                                /></div>
                        <div class="col-md-12"><label class="labels">Country</label><input type="text"
                                class="form-control" placeholder="enter phone number" value={data.country} disabled/></div>
                    </div>

                    <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button"
                    // update data
                    onClick={() => { updateData(id.id) }}
                    >Save
                            Profile</button></div>
                </div>


            </div>
        </div>
    </div>

            </>

    )
}

export default UpdateForm;