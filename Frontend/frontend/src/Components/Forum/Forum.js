import React, { useEffect, useState } from 'react'
import './Forum.css'
import Question from '../Question/Question';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

function Forum() {
    const [questions, setQuestions] = useState([]);
    const [questionForm, setQuestionForm] = useState('');
    const [viewForm, setViewForm] = useState(false);
    const [question, setQuestion] = useState('');
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        const url = process.env.REACT_APP_ROOT_URL + '/question/all'
        const token = localStorage.getItem('token');
        if(token == null)navigate('/sign-in')
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.status == 200) {
                setQuestions(res.data);
                setLoader(false);
            }
        }).catch((err) => {
            toast.error('error while getting questions');
            setLoader(false);
            // navigate('/sign-i')
        })
    }, [])

    const handleChange = (e) => {
        setQuestion(e.target.value);
    }

    const postQuestion = () => {
        const token = localStorage.getItem('token');
        if (token == null) navigate('/sign-in');
        setLoader(true)

        const url = process.env.REACT_APP_ROOT_URL + '/question/post'

        axios.post(url, {
            "question": question,
            "email": localStorage.getItem('email')
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res)
            setLoader(false);
            setViewForm(false);
            if(res.status == 200){
                setQuestions((prev) => [...prev,res.data]);
            }
        }).catch((err) => {
            console.log(err)
            setLoader(false);
            setViewForm(false);
            if (err.response.data.message == "un authorized access to application") {
                toast.error('unauthorised access')
                navigate('/sign-in')
            }
            toast.error('error while posting question')
        })

    }

    return (
        <div className='forum'>
            <ToastContainer />
            {viewForm ?
                <div className='questionScreen'>
                    {loader == false ?
                        <>
                            <div className='closeButton' onClick={() => { setViewForm((prev) => !prev) }}>
                                <FontAwesomeIcon style={{ height: "50px", width: "50px", position: "absolute", top: "20px", right: "40px", color: "white", cursor: "pointer" }} icon={faXmark} />
                            </div>
                            <div className='questionForm'>
                                <h3>Please Enter Your Question</h3>
                                <textarea onChange={(e) => handleChange(e)} placeholder='Enter Here'></textarea>
                                <button onClick={() => postQuestion()}>Submit</button>
                            </div>
                        </>
                        : <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />}
                </div>
                :
                <>
                    <div className='addQuestion'>
                        <button onClick={() => { setViewForm((prev) => !prev) }}>Ask Question</button>
                    </div>
                    {loader ?
                        <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> :
                        <div className='questions'>
                            {questions?.map((question) => {
                                return (
                                    <Question key={question.id} question={question} />
                                )
                            })}
                        </div>}
                </>
            }
        </div>
    )
}

export default Forum