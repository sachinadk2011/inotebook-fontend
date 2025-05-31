import React, {useContext, useState} from 'react'
import { useNavigate} from "react-router-dom";
import AlertContext from '../context/alerts/AlertContext'
import NoteContext from '../context/notes/NoteContext';

export default function VerifyOtp() {
    const alertContext = useContext(AlertContext)
  const {displayAlert} = alertContext;
  const navigate  = useNavigate();
  const [otp, setOtp] = useState("");
  
  const { user, setUser } = useContext(NoteContext);
  
  const email = user?.email; // Get email from state
  const name = user?.name;
  

  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
     const port = process.env.REACT_APP_URL;
     const response = await fetch(` ${port}/api/auth/verify-otp`, {
      method: "POST",
    
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {OtpCode: otp, email: email}),
    });
    const json = await response.json();
   /*  console.log(json); */

    /* if (!response.ok) {
      // Handle errors from the backend
      throw new Error(json.error || "Failed to create user");
    }  */
   if(json.message === "OTP has expired") {
    displayAlert("danger","OTP has expired. Please request new one" );

   }
   else if (json.success) {
      // Save the auth token and redirect
      
      /* console.log(json.token); */
      
      if (name !== "1") {
        navigate("/login.js");
      } else {
        setUser({ name: "1" }); // Update user context
        localStorage.setItem("user", JSON.stringify({ name: "1" })); // Store in localStorage
        navigate("/forgetpw");
      }
      
      displayAlert("success", "Email Verification is successful" );
    } 
   else{
    setOtp({OtpCode : ""});
     displayAlert("danger","Invalid Otp " );
   }
  
  };
  const resend = async (e)=> {
    e.preventDefault();

    const port = process.env.REACT_APP_URL;
     const response = await fetch(` ${port}/api/auth/resend`, {
      method: "POST",
    
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( { email: email}),
    });
    const json = await response.json();
    if (json.success) {
      displayAlert("success", "Verification code has been sent successfully.");
    } else {
      displayAlert("danger", "Failed to resend the verification code.");
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit} className="container">
      <div className="mb-3">
        <label htmlFor="otpInput" className="form-label">
          OTP Code
        </label>
        <input
          type="text"
          className="form-control"
          id="otpInput"
          name="otp"
          value={otp}
          onChange={handleChange}
          required
        />
      </div>
      <button type="button" className="btn btn-secondary me-2" onClick={resend}>
          Resend OTP
        </button>
      <button type="submit" className="btn btn-primary">
        Confirm
      </button>
    </form>
    </>
  )
}

