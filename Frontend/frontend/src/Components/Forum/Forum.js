import React, { useState } from 'react'
import './Forum.css'
import Question from '../Question/Question';

function Forum() {
    const [questions, setQuestions] = useState([]);
    const [questionForm, setQuestionForm] = useState('');
    const [viewForm, setViewForm] = useState(false);
    return (
        <>
            {viewForm ?
                <div className='questionForm'>

                </div> :
                <div className='forum'>
                    <div className='addQuestion'>
                        <button onClick={()=>{setViewForm((prev) => !prev)}}>Ask Question</button>
                    </div>
                    <div className='questions'>
                        {questions?.map((question) => {
                            return (
                                <Question key={question.id} question={question} />
                            )
                        })}
                    </div>
                </div>}
        </>
    )
}

export default Forum