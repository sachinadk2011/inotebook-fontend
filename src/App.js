import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { About } from './components/About';
import Home from './components/Home';
import { NoteState } from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import VerifyOtp from './components/VerifyOtp';
import ForgetPassword from './components/ForgetPassword';

function App() {

  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    <Alert />
   <Routes >

        <Route exact path="/" element={ <Home />} />   
        <Route exact path="/about" element={<About  />} />
        <Route exact path="/login" element={<Login  />} />
        <Route exact path="/signUp" element={<SignUp  />} />
        <Route exact path="/verifyotp" element={<VerifyOtp />} />
        <Route exact path="/forgetpw" element={<ForgetPassword />} />
        

      </Routes>  
      
    </Router>
    </NoteState>
    </>
  );
}

export default App;
   