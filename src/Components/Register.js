import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Register.css';


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    await fetch("http://localhost:8000/api/register", {
      method: 'POST',
      body: formData,
      headers: { "Accept": 'application/json'},
    }).then(response => {
      console.log(response);

      if (response.status === 200) {
          console.log('ok');
          return nav("/login");
      }
  });
  }
    return (
      <>
        <div className="col-sm-6 mt-5 offset-sm-3">
          <h5>Please fill the registration form:</h5>
          <div className='card p-3'>
            <form onSubmit= {createUser}>
              <div className="form-group">
                <label className='m-2' htmlFor="text">Name</label>
                <input type="text" className="form-control mb-2" id="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className='m-2' htmlFor="email">Email</label>
                <input type="email" className="form-control mb-2" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label className='m-2' htmlFor="pass">Password</label>
                <input type="password" className="form-control" id="pass" placeholder="Enter your new password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </>
    );
}
export default Register;
