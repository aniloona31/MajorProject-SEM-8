import React, { useEffect, useRef, useState } from 'react'
import './Question.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Question({ question }) {
    const [answers, setAnsers] = useState([]);
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const url = process.env.REACT_APP_ROOT_URL + '/answer/get';
        axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            },
            params: {
                "questionId": question.questionId
            }
        }).then((res) => {
            if (res.status == 200) {
                setAnsers(res.data);
            }
        }).catch((err) => {
            toast.error('error while getting answers');
        })
    }, [])

    const addAnswer = () => {
        const token = localStorage.getItem('token');
        const url = process.env.REACT_APP_ROOT_URL + '/answer/post'
        if (token == null) navigate('/sign-in')
        axios.post(url, {
            "questionId": question.questionId,
            "answer": answer,
            "email": localStorage.getItem('email')
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status == 200) {
                setAnsers((prev) => [...prev, res.data]);
                setAnswer('');
            }
        }).catch((err) => {
            if(err.response.data.message == "un authorized access to application"){
                navigate('/sign-in');
            }
            toast.error('error while adding answer')
        })
    }

    const openAccordian = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="accordion">
            <ToastContainer />
            <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
                <div className="accordion-item-header">
                    <span className="accordion-item-header-title">{question.question}</span>
                    <div style={{color:"grey",marginBottom:"5px"}}>{question.askedDate.substring(0,10)}</div>
                </div>
                <div className='accordianButtons'>
                    <span onClick={() => openAccordian()} style={{ display: "flex", alignItems: "center", flexDirection: "row", cursor: "pointer", color: "rgb(7,7,173)" }}><FontAwesomeIcon style={{ height: "20px", width: "20px", marginRight: "3px" }} icon={faCommentDots} />Replies</span>
                    <input value={answer} onChange={(e) => setAnswer(e.target.value)} type='text' placeholder='Enter Here' />
                    <button onClick={() => addAnswer()}>Submit</button>
                </div>
                {(answers.length > 0) ?
                    answers.map((answer) => {
                        return (
                            <div className="accordion-item-description-wrapper">
                                <div className="accordion-item-description">
                                    <hr />
                                    <div style={{padding:"10px 10px 10px 10px"}}>{answer.answer}</div>
                                    <span style={{fontSize:"small",display:"flex",flexDirection:"row",paddingLeft:"10px",paddingRight:"10px", color:"grey",justifyContent:"space-between"}}><div>{answer.email}</div><div>{answer.date.substring(0,10)}</div></span>
                                </div>
                            </div>
                        )
                    }) :
                    <div className="accordion-item-description-wrapper">
                        <div className="accordion-item-description">
                            <hr/>
                            <p>No Replies Yet.</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Question