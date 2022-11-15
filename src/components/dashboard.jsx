
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';




let endpint = "http://localhost:8082/v1/";


const Dashboard = () => {
    const navigate = useNavigate();
    if (localStorage.getItem('token') == null) {
        navigate("/login");
    }
    // display data in table using endpoint
    const [data, setData] = useState([]);
    useEffect(() => {
        // console.log({Authorization: 'Bearer ' + localStorage.getItem('token')})
        axios.get(endpint + "getStudents", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            setData(res.data);


        })

            .catch((err) => {
                console.log(err);
            })
    }, [])

    // delete data from table using endpoint
    const deleteData = (id) => {

        axios.delete(endpint + "deletestudent/" + id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                console.log(res);
                alert("Record Deleted Successfully")
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
        console.log("clecked")
    }

    // update data from table using endpoint
    const updateData = (id) => {

        console.log("clecked")
        window.location.href = "/update/" + id;
    }
    //pagination 10 post per page
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.data?.slice(indexOfFirstPost, indexOfLastPost);


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    let pages = Math.ceil((data.data?.length) / 10)
    // console.log(pages, 'pages');

    // search data
    const searchData = (e) => {
        // console.log(e.target.value);
        axios.get(endpint + "search?search=" + e.target.value, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                setData(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <div className="card">
                            <div className="card-header">
                                <h3>Student Details</h3>
                                <button
                                    style={{ float: "right", marginTop: "-40px" }}
                                    className="btn btn-danger" onClick={() => {
                                        localStorage.removeItem('token');
                                        alert("Logout!! Please Login Again")
                                        window.location.href = "/login";
                                    }}>Logout</button>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search"
                                        onChange={(e) => searchData(e)} />
                                </div>

                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Serial No.</th>
                                            <th>Photo</th>
                                            <th>Student Name</th>
                                            <th>Student Email</th>
                                            <th>Student Mobile</th>
                                            <th>Country</th>
                                            <th>Country Code</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPosts?.map((item, index) => {
                                            var img = (item.image === "") ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : "data:image/png;base64," + item.image;
                                            return (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td><img src={img} alt="img" style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone_number}</td>
                                                    <td>{item.country}</td>
                                                    <td>{item.country_code}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => updateData(item.id)}>Update</button>&nbsp;&nbsp;
                                                        <button className="btn btn-danger" onClick={() => deleteData(item.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}



                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center">
                                    <nav>
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <span onClick={() => paginate(currentPage - 1)} className="page-link">
                                                    Prev
                                                </span>
                                            </li>
                                            {Array.from({ length: pages }, (_, i) => (
                                                <li key={i} className="page-item">
                                                    <span onClick={() => paginate(i + 1)} className="page-link">
                                                        {i + 1}
                                                    </span>
                                                </li>
                                            ))}

                                            <li className="page-item">
                                                <span onClick={() => paginate(currentPage + 1)} className="page-link">
                                                    Next
                                                </span>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;


