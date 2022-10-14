import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

import { useState } from 'react';


function App() {

  //Alert 
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg:message,
      type:type
    });
    setTimeout( () => {
      setAlert(null);
    }, 1500);
  }

  return (    
      <NoteState>
      <Router>
          <Navbar/>
          <Alert alert={alert}/>
            <div className='container my-5' >
            <Routes>              
              <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
              <Route exact path='/about' element={<About showAlert={showAlert}/>}></Route>
              <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
            </div>
          <Footer/>
      </Router>
      </NoteState>   
  );
}

export default App;
