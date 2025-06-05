import React, { useContext } from "react";
import AlertContext from "../context/alerts/AlertContext";

import { Link, useLocation, useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AuthContext from "../context/authentication/AuthContext";

function Navbar() {
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const { user, setUser } = useContext(NoteContext);
  const {DeleteUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ name: "", email: "" });
    localStorage.removeItem("user");
    displayAlert("success", "logout Successfully");
    navigate("/login");
  };
  const handleDelete = async() => {
    try {
      
      const json = await DeleteUser()
     console.log(json.message);
    displayAlert("success", json.message);
    //  Clear localStorage and redirect to login/home
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    

      
    } catch (error) {
      // console.error('Error:', error.message);
      displayAlert("danger", error.message);
      navigate("/login");
      
    }

    
  };
  let location = useLocation();
  
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  } `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  } `}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="button">
                <Link
                  className="btn btn-primary mx-2 "
                  tabIndex="-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  tabIndex="-1"
                  to="/signUp"
                  role="button"
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <>
                <span className="text-body-secondary mx-10">
                  Welcome, {user?.name}, {user?.email}
                </span>
                <button className="btn btn-primary mx-1" onClick={handleLogout}>
                  LogOut
                </button>
                <button className="btn btn-primary mx-1" onClick={handleDelete}>
                  Delete Account
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
