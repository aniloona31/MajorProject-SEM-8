import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_ROOT_URL + "/auth/register";
    axios.post(url, {
        "email": email,
        "password": password,
        "username": username
    })
    .then((res) => {
     if(res.status === 201){
        notify(res.data)
        navigate("/sign-in")
     }else{
        notify("Error while adding user","success")
     }   
    })
    .catch((error) => {console.log(error);notify(error.response.data.message,"error")})
  }

  const notify = (msg, type) =>{
    if(type === "success"){
        toast.success(msg);
    }else{
        toast.error(msg);
    }
  }

  return (
    <div className="signup-container">
        <ToastContainer/>
            <form className="signup-form">
                <h1>Welcome Back</h1>
                <p>Please Signup your account</p>
                <div className="input-group">
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" required />
                </div>
                <div className="input-group">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Password" required />
                </div>
                <div className="input-group">
                    <input type="text" id="username" onChange={(e) => setUsername(e.target.value)} value={username} name="username" placeholder="Username" required />
                </div>
                <button onClick={signUp} className='signupButton' type="submit">Signup</button>
            </form>
        </div>
  )
}

export default SignUp