import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const [credential, setCredential] = useState({email: "" , password: "", name: "", cpassword: ""})
  const navigate  = useNavigate();
 
  
  const HandleSignup = async (e) => {
    e.preventDefault();
   const  {name, email,password} = credential;
    
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
      props.displayAlert("success", "Account created successfully" );
    } 
   else{
    setCredential({email: "" , password: "", name: "", cpassword: ""});
    props.displayAlert("danger","Invalid credential" );
   }
  
  };
  const ochange =(e) =>{
    setCredential({...credential, [e.target.name]:e.target.value });
  }

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
            name="cpassword" onChange={ochange} value={credential.password}
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
      </form>
    </>
  );
}
