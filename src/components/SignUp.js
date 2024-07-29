import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from '../context/alerts/AlertContext'

export default function SignUp() {
  const alertContext = useContext(AlertContext)
  const {displayAlert, clearAlert} = alertContext;
  const [credential, setCredential] = useState({email: "" , password: "", name: "", cpassword: ""})
  const navigate  = useNavigate();
 
  
  const HandleSignup = async (e) => {
    e.preventDefault();
   const  {name, email,password, cpassword} = credential;

   // Check if password and confirm password match
   if (password !== cpassword) {
  displayAlert("warning", "Passwords do not match");
  return; // Stop further execution if passwords don't match
}
    
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
    
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {name, email,password}),
    });
    const json = await response.json();
    console.log(json);

    /* if (!response.ok) {
      // Handle errors from the backend
      throw new Error(json.error || "Failed to create user");
    }  */ if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.token);
      console.log(json.token);
      navigate("/login.js");
       displayAlert("success", "Account created successfully" );
    } 
   else{
    setCredential({email: "" , password: "", name: "", cpassword: ""});
     displayAlert("danger","Invalid credential" );
   }
  
  };
  const ochange =(e) =>{
    setCredential({...credential, [e.target.name]:e.target.value });
  }
  const HandleClear = (e)=>{
    e.preventDefault();
    setCredential({email: "" , password: "", cpassword: "", name: ""});
    
    displayAlert("success","Credential has been cleared successfully" );

  }
  // Use effect to handle password validation and alert
  useEffect(() => {
    if (credential.password.length > 0 && credential.password.length < 8 ) {
      displayAlert("info", "Password must be  at least 8 characters.");
    } else  {
      clearAlert();
    }
  }, [credential.password, displayAlert, clearAlert]);


  return (
    <>
      <h2 className="container my-3">Create an account in Inotebook</h2>
      <form className="container " onSubmit={HandleSignup}>
        <div className="mb-3  ">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input type="text" className="form-control" id="name" name="name" onChange={ochange} value={credential.name} minLength={3} required />
        </div>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" onChange={ochange} value={credential.email}
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={8}
            onChange={ochange} value={credential.password}
            required
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword" onChange={ochange} value={credential.cpassword}
            required
          />
        </div>

        <button
        disabled={credential.name.length<3 || credential.password.length<8}
          type="submit"
          className="btn btn-primary "
          
        >
          Signup
        </button>
        <button
        disabled={credential.email.length===0 || credential.password.length<8}
          type="clear"
          className="btn btn-primary mx-3"
          onClick={HandleClear}
        >
          Clear
        </button>
      </form>
    </>
  );
}
