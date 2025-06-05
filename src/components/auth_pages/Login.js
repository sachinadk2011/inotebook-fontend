import React, {useContext, useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
// ✅ Correct import inside any auth_pages/*.js
import AlertContext from "../../context/alerts/AlertContext";
import NoteContext from "../../context/notes/NoteContext";
import AuthContext from '../../context/authentication/AuthContext';





export default function Login() {
  const alertContext = useContext(AlertContext)
  const {displayAlert, clearAlert} = alertContext;
  const [credential, setCredential] = useState({email: "" , password: ""})
  const navigate  = useNavigate();
  const {setUser} = useContext(NoteContext);
  const {Login, GetUser} = useContext(AuthContext)
 
  
  const HandleSignup = async (e) => {
    e.preventDefault();
   const  { email,password} = credential;
   try {
    
     const json = Login(email, password);
     
     
     
     /* console.log(json); */
     if(json.success){
       // Save the auth token and redirect
       localStorage.setItem('token', json.token);
       
       
       const userData = await GetUser();  // 🟢 Fetch full user info using token
       
       if (userData) {
         setUser({ name: userData.name, email: userData.email });
         localStorage.setItem('user', JSON.stringify({ name: userData.name, email: userData.email }));
        }
        
        
        displayAlert("success","Login successful");
        navigate("/");
      }else{
        setCredential({email , password: ""});
        displayAlert("danger",json.message);
      }
    } catch (error) {
     displayAlert("danger", error);
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
    } else  {
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
        <div><Link className="btn btn-link " to="/forgetpw" role="button">
          <h6  style={{marginTop: "-25px", fontSize: "13px"}}>
            Forget Password ?
            </h6>
            </Link>
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
