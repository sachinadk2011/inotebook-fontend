import React, { useContext } from 'react'
import AlertContext from '../context/alerts/AlertContext'

import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const alertContext = useContext(AlertContext)
  const {displayAlert} = alertContext;
  const navigate  = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    displayAlert("success" , "logout Successfully");
    navigate('/login.js');
  }
  let location = useLocation();
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Notebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about.js"?"active":""} `} to="/about.js">About</Link>
        </li>
        
       
      </ul>
      {!localStorage.getItem('token')? <form className="d-flex" role='button'>
             <Link  className="btn btn-primary mx-2 " tabIndex="-1" to="/login.js" role="button">
              Login
            </Link>
            <Link  className="btn btn-primary mx-1" tabIndex="-1" to="signUp.js" role="button">
              SignUp
            </Link></form> : <button  className="btn btn-primary mx-1" onClick={handleLogout} >
              LogOut
            </button>}
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar