import React,{useState, useContext, useEffect} from 'react'
import AlertContext from '../context/alerts/AlertContext';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

function ForgetPassword() {
    const alertContext = useContext(AlertContext)
    const {displayAlert, clearAlert} = alertContext;
    const {setUser, user} = useContext(NoteContext);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [credential, setCredential] = useState({ email: "", password: "", currentPassword: "" , cpassword : ""});
  
const name = user?.name;
    const ochange = (e)=>{
        setCredential({...credential, [e.target.name]:e.target.value });
    };
    const handleEmail = async(e)=>{
        e.preventDefault();
        const  {email} = credential;
        console.log(email, credential.email, "after this ");

        try {
        const port = process.env.REACT_APP_URL;
        const response = await fetch(` ${port}/api/auth/forget-password`, {
            method: "POST",
            
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( { email})
        });
        // Debugging
  console.log("Response status:", response.status);
  const json = await response.json();
  if (!json.success) {
    return displayAlert("danger", json.message);
  }
  displayAlert("success", "OTP sent to your email.");
  setUser({  email, name: "1" });  // Set both name and email on sign up
localStorage.setItem('user', JSON.stringify({  email, name: "1" }));
  navigate("/verifyotp.js");



        }
           catch (error) {
            console.error("Errer fetching ", error);
          }
}
        
   

    
    const handlePasswordChange = async () => {
        const { email, password,  cpassword } = credential;
        const port = process.env.REACT_APP_URL;
        
    
        // Check if password and confirm password match
 if (password !== cpassword) {
  displayAlert("warning", "Passwords do not match");
  return; // Stop further execution if passwords don't match
}
        try {
          const response = await fetch(` ${port}/api/auth/resetpw`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password}),
          });
          const json = await response.json();
          if( name !== "1"){

          if (!json.success ) {
            return displayAlert("danger", "incorreect current pw");
          }}
          displayAlert("success", "Password updated successfully.");
          setStep(1);
           // Reset steps after success
           setUser({ name: "" });
  localStorage.removeItem('user');
          navigate("/login.js");
        } catch (error) {
          displayAlert("danger", "Failed to update password. Try again later.");
        }
    };
    
    // Use effect to handle password validation and alert
      useEffect(() => {
        if (credential.password.length > 0 && credential.password.length < 8 ) {
          displayAlert("info", "Password must be  at least 8 characters.");
        } else  {
          clearAlert();
        }
      }, [credential.password, displayAlert, clearAlert]);
      useEffect(() => {
        if (name === "1") {
          setStep(3);
        }
      }, [name]);
  return (
    <>
    {step === 1 && (
        <>
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
          <button className='btn btn-primary' type='submit' onClick={handleEmail}>Submit</button>
        </>
    )}
    
    {step === 3  && (
        <>
          
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={ochange}
            value={credential.password}
            required
          />
          <label htmlFor="cpassword" className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={ochange}
            value={credential.cpassword}
            required
          />
          <button className="btn btn-primary" type="button" onClick={handlePasswordChange}>
            Update Password
          </button>
        </>
      )}
    </>
  );
   

}

export default ForgetPassword;