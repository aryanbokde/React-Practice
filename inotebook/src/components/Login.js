import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault(); 
    //Todo Api calls
    const response = await fetch("http://localhost:5000/api/auth/login", {            
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }) 
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      props.showAlert("Login successfully", "success");
      navigate('/');      
    }else{
      props.showAlert("Invalid Login", "danger");
    }

  }

  const onChnage = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }


  return (
    <>
    { !localStorage.getItem('token')? <div>
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
          <div className="col-md-6">
              <div className="card px-4 py-4" id="form1">
                  <div className="form-data">
                    <h2 className='mb-3 pb-3'>Login to continue iNotebook</h2>
                    <form onSubmit={handleLogin}>
                      <div className="forms-inputs mb-4"> <span>Email or username</span> <input autoComplete='on' type="email" name="email" className='form-control' value={credentials.email} id='email' onChange={onChnage} required/>
                          <div className="invalid-feedback">A valid email is required!</div>
                      </div>
                      <div className="forms-inputs mb-4"> <span>Password</span> <input autoComplete='on' type="password" name='password' className='form-control' value={credentials.password} id='password' onChange={onChnage} required/>
                          <div className="invalid-feedback">Password must be 8 character!</div>
                      </div>
                      <div className="mb-3"> <button className="btn btn-dark w-100">Login</button> </div>
                    </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div> : <div className='container'><b>You are already a login user..!</b></div> }
  </>

  )
}

export default Login
