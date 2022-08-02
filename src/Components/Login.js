import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
    console.log(JSON.stringify(credentials));
    return fetch('http://localhost:8000/api/login',
        {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }).then(data => data.json())
}
export default function Login({ setLogedIn }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const nav = useNavigate();

    useEffect(() => {
        if (token) {
            console.log(token);
            window.location.href = '/restaurants'
        }
        else if (!token) {
            return nav("/login");
        }
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loginInfo = await loginUser({ email, password });
        setToken(loginInfo["authorisation"]["token"]);
        localStorage.setItem('token', loginInfo["authorisation"]["token"]);
        localStorage.setItem('username', loginInfo["user"]["name"]);
        localStorage.setItem('admin', loginInfo["user"]["admin"]);
        setLogedIn(true);
    }
    return (
        <div className='container-md'>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="pass">Password</label>
                    <input type="password" class="form-control" id="pass" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <br />
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
