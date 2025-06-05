import './App.css';
import React, {useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Navbar from './components/Navbar';
import { About } from './components/About';
import Home from './components/Home';
import { NoteState } from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/auth_pages/Login';
import SignUp from './components/auth_pages/SignUp';
import VerifyOtp from './components/auth_pages/VerifyOtp';
import ForgetPassword from './components/auth_pages/ForgetPassword';
import ResetPassword from './components/auth_pages/ResetPassword';
import NoteContext from './context/notes/NoteContext';
import { useContext } from 'react';
import AuthContext from './context/authentication/AuthContext';



function App() {
  const { setUser } = useContext(NoteContext); // ⛔️ This only works if wrapped in <NoteState>
  const {GetUser} = useContext(AuthContext)
  const navigate  = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (localStorage.getItem("token")) {
        const user = await GetUser(); // 👉 fetches full user
        if (user) setUser({ name: user.name, email: user.email });
        else{
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    checkUser();
  }, []);


  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    <Alert />
   <Routes >

        <Route exact path="/" element={ <Home />} />   
        <Route exact path="/about" element={<About  />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/verifyotp" element={<VerifyOtp />} />
        <Route exact path="/forgetpw" element={<ForgetPassword />} />
        <Route exact path="/resetpw" element={<ResetPassword />} />
        

      </Routes>  
      
    </Router>
    </NoteState>
    </>
  );
}

export default App;
   