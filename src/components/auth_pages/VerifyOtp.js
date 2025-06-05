import React, {useContext, useState} from 'react'
import { useNavigate} from "react-router-dom";
// ✅ Correct import inside any auth_pages/*.js
import AlertContext from "../../context/alerts/AlertContext";
import NoteContext from "../../context/notes/NoteContext";
import AuthContext from '../../context/authentication/AuthContext';


export default function VerifyOtp() {
    const alertContext = useContext(AlertContext)
  const {displayAlert} = alertContext;
  const navigate  = useNavigate();
  const [otp, setOtp] = useState("");
  const {VerifyOtp, ResendOtp} = useContext(AuthContext)
  
  const { user, setUser } = useContext(NoteContext);
  
  const email = user?.email; // Get email from state
  const flow = user?.flow;
  

  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const json = await VerifyOtp(otp,email);
      
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
          
          if (flow === "signup" || flow ==="") {
            
            navigate("/login");
          } else {
            
            navigate("/resetpw");
          }
          // Clear the flow afterward, keeping only the email
          setUser({ email });
          
          displayAlert("success", "Email Verification is successful" );
        } 
        else{
          setOtp({OtpCode : ""});
          displayAlert("danger","Invalid Otp " );
        }
      } catch (error) {
        displayAlert("danger", error);
      }
  
  };
  const resend = async (e)=> {
    e.preventDefault();

    const json = ResendOtp(email)
     
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

