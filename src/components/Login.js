import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../context/alerts/AlertContext'


export default function Login() {
  const alertContext = useContext(AlertContext)
  const {displayAlert, clearAlert} = alertContext;
  const [credential, setCredential] = useState({email: "" , password: ""})
  const navigate  = useNavigate();
 
  
  const HandleSignup = async (e) => {
    e.preventDefault();
   const  { email,password} = credential;
    
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
    
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( { email, password}),
    });
    const json = await response.json();

    console.log(json);
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.token);
      console.log(json.token);
      navigate("/");
      displayAlert("success","Login successful");
    }else{

      
    displayAlert("danger","Invalid credential");
    }
    
  
  };
  const HandleClear = (e)=>{
    e.preventDefault();
    setCredential({email: "" , password: ""});
    displayAlert("success","Credential has been cleared successfully" );

  }
  const ochange =(e) =>{
    const {name, value} = e.target
    setCredential({...credential, [name]:value });
    
    
  }
  // Use effect to handle password validation and alert
  useEffect(() => {
    if (credential.password.length > 0 && credential.password.length < 8) {
      displayAlert("info", "Password must be  at least 8 characters.");
    } else if (credential.password.length >= 8) {
      clearAlert();
    }
  }, [credential.password, displayAlert, clearAlert]);

  return (
    <>
      <h2 className="container my-3">Login to connect Inotebook</h2>
      <form className="container " onSubmit={HandleSignup} >
        
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" onChange={ochange}
             value={credential.email}
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
        

        <button
        disabled={credential.email.length===0 || credential.password.length<8}
          type="submit"
          className="btn btn-primary  "
          
        >
          Login
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
  )
}
