import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// ✅ Correct import inside any auth_pages/*.js
import AlertContext from "../../context/alerts/AlertContext";
import NoteContext from "../../context/notes/NoteContext";
import AuthContext from "../../context/authentication/AuthContext";


function ForgetPassword() {
  const alertContext = useContext(AlertContext);
  const { displayAlert } = alertContext;
  const { setUser } = useContext(NoteContext);
  const {ForgetPassword} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    currentPassword: "",
    cpassword: "",
  });
  
  const flow = "forgetpw";
  const ochange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleEmail = async (e) => {
    e.preventDefault();
    const { email } = credential;
    

    try {
      
      const json = ForgetPassword(email)
      
      if (!json.success) {
        
        return displayAlert("danger", json.message);
      }
      displayAlert("success", "OTP sent to your email.");
      setUser({ email, flow: flow }); // Set both name and email on sign up
      localStorage.setItem("user", JSON.stringify({ email, flow: flow}));
      navigate("/verifyotp");
    } catch (error) {
      displayAlert("danger", error);
      // console.error("Errer fetching ", error);
    }
  };

  

  
  return (
    
     
        <>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={ochange}
            value={credential.email}
            aria-describedby="emailHelp"
            required
          />
          <button
            className="btn btn-primary t-5"
            type="submit"
            onClick={handleEmail}
          >
            Submit
          </button>
        </>
      
     
   
  );
}

export default ForgetPassword;
