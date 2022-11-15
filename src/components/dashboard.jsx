import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
// import updateForm from './updateForm';

let endpint = "http://localhost:8082/v1/";

// create data table using react-data-table-component and fetch data from backend
const Dashboard = () => {

    // display data in table using endpoint
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(endpint + "getStudents")
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // console.log(data, 'hi');
    // delete data from table using endpoint
    const deleteData = (id) => {
        axios.delete(endpint + "deletestudent/" + id)
            .then((res) => {
                console.log(res);
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

    let pages =Math.ceil((data.data?.length)/10)
    // console.log(pages, 'pages');

    // search data
    const searchData = (e) => {
        // console.log(e.target.value);
        axios.get(endpint + "search?" +"search="+ e.target.value)
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
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>Student Details</h3>
                                {/* search bar */}
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" 
                                    //search bar function and default value
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
                                            return (
                                                <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td><img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="img" style={{ width: "50px", height: "50px", borderRadius: "50%" }} /></td>
                                                    {/* <td><img src={item.photo} alt="" /></td> */}
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone_number}</td>
                                                    <td>{item.country}</td>
                                                    <td>{item.country_code}</td>
                                                    <td>
                                                        <button className="btn btn-primary" onClick={() => updateData(item.id)}>Update</button>
                                                        <button className="btn btn-danger" onClick={() => deleteData(item.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}


  
                                    </tbody>
                                </table>
                                        {/* 10 row per page pagination code */}
                                        <div className="d-flex justify-content-center">
                                            <nav>
                                                <ul className="pagination">
                                                    <li className="page-item">
                                                        <a onClick={() => paginate(currentPage - 1)} href="" className="page-link">
                                                            Prev
                                                        </a>
                                                    </li>
                                                    {Array.from({ length: pages }, (_, i) => (
                                                        <li key={i} className="page-item">
                                                            <a onClick={() => paginate(i + 1)} href="" className="page-link">
                                                                {i + 1}
                                                            </a>
                                                        </li>
                                                    ))}

                                                    <li className="page-item">
                                                        <a onClick={() => paginate(currentPage + 1)} href="" className="page-link">
                                                            Next
                                                        </a>
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


