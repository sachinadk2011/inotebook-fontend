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
import AlertContext from './context/alerts/AlertContext';


// ✅ This component is inside the Router and NoteState Providers
function AppContent() {
  const {  setUser } = useContext(NoteContext);
  const { GetUser } = useContext(AuthContext);
  const { displayAlert } = useContext(AlertContext)
  const navigate = useNavigate();

  useEffect(() => {
  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await GetUser();
        
          setUser({ name: userData.name, email: userData.email });
        
      } catch (error){
        localStorage.removeItem('token');
        displayAlert("danger", error.message)
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };
  checkUser();
  // eslint-disable-next-line
}, []);


  return (
    <>
      <Navbar />
      <Alert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route path="/forgetpw" element={<ForgetPassword />} />
        <Route path="/resetpw" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
function App() {
  


  return (
    <>
    <NoteState>
    <Router>
    <AppContent />
      
    </Router>
    </NoteState>
    </>
  );
}

export default App;
   