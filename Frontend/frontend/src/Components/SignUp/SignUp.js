import React, { useState } from 'react'
import './SignUp.css'

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="signup-container">
            <form className="signup-form">
                <h1>Welcome Back</h1>
                <p>Please Signup your account</p>
                <div className="input-group">
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="email" required />
                </div>
                <div className="input-group">
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Password" required />
                </div>
                <button className='signupButton' type="submit">Signup</button>
            </form>
        </div>
  )
}

export default SignUp