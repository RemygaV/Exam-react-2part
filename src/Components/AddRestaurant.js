import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function AddRestaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [address, setAddress] = useState("");

    //-----------------------------------------------------
    function saveData() {
        let data = { name, code, address };
        // console.log(data);

        fetch("http://127.0.0.1:8000/api/restaurants", {
            method: "POST",
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log(response);
                alert("New restaurant was added successfully");
                window.location.href = '/restaurants';
            })
    }

    //-------------------------


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">

                <div className='col-md-6  '>
                    <div className="card ">
                        <div className='card-header'>
                            <h4>Add Restaurant
                                <Link to={'/restaurants'} className="btn btn-dark btn sm float-end">BACK</Link>
                            </h4>
                        </div>
                        <div className='card-body'>

                            <div className='form-group mb-3'>
                                <label>Restaurant name</label>
                                <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className='form-control' placeholder='Enter a restaurant name...' />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Restaurant code</label>
                                <input type="text" name="code" value={code} onChange={(e) => { setCode(e.target.value) }} className='form-control' placeholder='Enter a restaurant code (max 8 numbers)..' />
                            </div>
                            <div className='form-group mb-3'>
                                <label>Restaurant address</label>
                                <input type="text" name="address" value={address} onChange={(e) => { setAddress(e.target.value) }} className='form-control' placeholder='Enter a restaurant address..' />
                            </div>
                            <div className='form-group mb-3'>
                                <button type="subit" onClick={saveData} className='btn btn-primary'>Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AddRestaurant;