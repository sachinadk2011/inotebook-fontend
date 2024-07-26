import './App.css';
import React/* , {useState} */ from 'react'
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

function App() {
  /* const [alert, setAlert] = useState(null)
  const displayAlert = (types, msg)=>{
    setAlert({
      msg: msg,
      type: types
    })
    setTimeout(()=>{
      setAlert(null);
    })
  } */
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    <Alert /* alert={alert} */ /* displayAlert={displayAlert}  *//>
   <Routes >
          <Route exact path="/about.js" element={<About  />} />
             
          <Route exact path="/" element={ <Home /* displayAlert={displayAlert}  *//>} />   
        
      </Routes>  
    </Router>
    </NoteState>
    </>
  );
}

export default App;
   