import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// ✅ Correct import inside any auth_pages/*.js
import AlertContext from "../../context/alerts/AlertContext";
import NoteContext from "../../context/notes/NoteContext";
import AuthContext from "../../context/authentication/AuthContext";

function ResetPassword() {
  const alertContext = useContext(AlertContext);
  const { displayAlert, clearAlert } = alertContext;
  const { setUser, user } = useContext(NoteContext);
  const {ResetPassword} = useContext(AuthContext)
  const navigate = useNavigate();

  const email = user?.email;
  // console.log(email);
  useEffect(() => {
    if (!email) {
      navigate("/forgetpw");
    }
  }, [email, navigate]);
  const [credential, setCredential] = useState({
    password: "",
    cpassword: "",
  });
  const ochange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async () => {
    const { password, cpassword } = credential;

    

    // Check if password and confirm password match
    if (password !== cpassword) {
      displayAlert("warning", "Passwords do not match");
      setCredential({ password: "", cpassword: "" });
      return; // Stop further execution if passwords don't match
    }
    try {
      const json = await ResetPassword(email, password);

      

      displayAlert("success", json.message);

      setUser({ flow: "" });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      displayAlert("danger", error.message);
    }
  };

  // Use effect to handle password validation and alert
  useEffect(() => {
    if (credential.password.length > 0 && credential.password.length < 8) {
      displayAlert("info", "Password must be  at least 8 characters.");
    } else {
      clearAlert();
    }
  }, [credential.password, displayAlert, clearAlert]);

  return (
    <>
      <label htmlFor="password" className="form-label">
        New Password
      </label>
      <input
        type="password"
        className="form-control"
        id="password"
        name="password"
        onChange={ochange}
        value={credential.password}
        required
      />
      <label htmlFor="cpassword" className="form-label">
        Confirm Password
      </label>
      <input
        type="password"
        className="form-control"
        id="cpassword"
        name="cpassword"
        onChange={ochange}
        value={credential.cpassword}
        required
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={handlePasswordChange}
      >
        Update Password
      </button>
    </>
  );
}

export default ResetPassword;
