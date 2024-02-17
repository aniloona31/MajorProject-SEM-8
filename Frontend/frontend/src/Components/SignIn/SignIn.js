import React, { useState } from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'

function SignIn() {

    const [email ,setEmail] = useState('') 
    const [password ,setPassword] = useState('')

    const navigate = useNavigate();

    return (
        <div className="login-container">
            <form className="login-form">
                <h1>Welcome Back</h1>
                <p>Please login to your account</p>
                <div className="input-group">
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" required />
                </div>
                <div className="input-group">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Password" required />
                </div>
                <button className='loginButton' type="submit">Login</button>
                <div className="bottom-text">
                    <p>Don't have an account? <span onClick={()=>navigate('/sign-up')}>Sign Up</span></p>
                </div>
            </form>
        </div>
    )
}

export default SignIn