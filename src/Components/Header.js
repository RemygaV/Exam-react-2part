import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          
            <div className="navbar-collapse d-inline">
                {token
                    ? <ul className="navbar-nav ">
                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/restaurants">Restaurants</NavLink></li>
                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/dishes">Dishes</NavLink></li></ul>
                    : <ul className="navbar-nav">
                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/login">To LogIn</NavLink></li>
                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link text-warning active" : "nav-link ")} to="/register">To register</NavLink></li>
                    </ul>}
            </div>
            <div>
                {token ? <button className='btn btn-danger m-1 ' onClick={(e) => { setToken(localStorage.removeItem('token')); window.location.href = '/login' }} >Log out</button> : ""}
            </div>
        </nav>
    )
}

export default Header;