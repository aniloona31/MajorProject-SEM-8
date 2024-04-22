import React, { useState } from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useStateValue } from '../../Context/StateProvider'
import { Oval } from 'react-loader-spinner'

function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoader(true);
        const url = process.env.REACT_APP_ROOT_URL + "/auth/login"

        axios.post(url, {
            "email": email,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then((res) => {
            localStorage.setItem('token', res.data);
            toast.success("Login Successful")
            localStorage.setItem('email', email);
            setLoader(false);
            navigate('/Home');
        }).catch((error) => {
            setLoader(false);
            if (error.code === "ERR_BAD_REQUEST")
                toast.error("Invalid Credentials or Not Registered");
            else if (error.code === "ERR_BAD_RESPONSE")
                toast.error("Internal Server Error");
            console.log(error);
            toast.error(error.response.data.message);
        })

    }

    return (
        <div className="login-container">
            {loader ? <div className='placeLoader'><Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /></div> :
                <form className="login-form">
                    <ToastContainer />
                    <h1>Welcome Back</h1>
                    <p>Please login to your account</p>
                    <div className="input-group">
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email" required />
                    </div>
                    <div className="input-group">
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Password" required />
                    </div>
                    <button className='loginButton' onClick={handleLogin} type="submit">Login</button>
                    <div className="bottom-text">
                        <p>Don't have an account? <span onClick={() => navigate('/sign-up')}>Sign Up</span></p>
                    </div>
                </form>}
        </div>
    )
}

export default SignIn