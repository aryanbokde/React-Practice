import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  
  const [data, setData] = useState({name:"", email:"", password:"", cpassword:"" });
  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); 
    //Todo Api calls
    const response = await fetch("http://localhost:5000/api/auth/createuser", {            
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: data.name, email: data.email, password: data.password }) 
    });

    const json = await response.json();
    
    if (json.success) {
      console.log(json);
      localStorage.setItem("token", json.authToken);
      navigate('/');
      props.showAlert("Account has been created successfully", "success");
    }else{
      props.showAlert("Invalid details or email already exists", "danger");
    }

  }

  const onChnage = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  return (
    <>
    { !localStorage.getItem('token')?<div>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
            <div className="col-md-6">
                <div className="card px-4 py-4" id="form1">
                    <div className="form-data">
                      <h2 className='mb-3 pb-3'>Signup to continue iNotebook</h2>
                      <form onSubmit={handleSignup}>
                        <div className="forms-inputs mb-4"> <span>Name</span> 
                            <input type="text" name="name" className='form-control' onChange={onChnage} required minLength={3}/>
                        </div>
                        <div className="forms-inputs mb-4"> <span>Email</span> 
                            <input type="email" name="email" className='form-control' onChange={onChnage} required/>
                        </div>
                        <div className="forms-inputs mb-4"> <span>Password</span> 
                            <input type="password" name='password' className='form-control' onChange={onChnage} required minLength={5}/>
                        </div>
                        <div className="forms-inputs mb-4"> <span>Comfirm Password</span> 
                            <input type="password" name='cpassword' className='form-control' onChange={onChnage} required minLength={5}/>
                        </div>
                        <div className="mb-3"> <button className="btn btn-dark w-100">Signup</button> </div>
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

export default Signup
