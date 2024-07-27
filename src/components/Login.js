import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login(props) {
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
      props.displayAlert("success","Login successful");
    }else{

      
    props.displayAlert("danger","Invalid credential");
    }
    
  
  };
  const ochange =(e) =>{
    const {name, value} = e.target
    setCredential({...credential, [name]:value });
    
  }

  return (
    <>
      <h2 className="container my-3">Login to connect Inotebook</h2>
      <form className="container " onSubmit={HandleSignup}>
        
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
          className="btn btn-primary "
          
        >
          Login
        </button>
      </form>
    </>
  )
}
