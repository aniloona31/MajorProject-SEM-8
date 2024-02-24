import React, { useState } from 'react'
import './PostReview.css'
import { faImages, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PostReview({addReview}) {

    const [images, setImages] = useState([]);
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState('');

    const appendImage = (e) =>{
        setImages([...images,e.target.files[0]]);
    }

    const submitForm = (e) =>{
        e.preventDefault();
        console.log(images, rating,description);
        addReview();
    }

    return (
        <div className='mainWrapper'>
            <div className='mainReviewContainer'>
                <div className="postReviewContainer">
                    <div className="postReviewTitle">Rate your experience</div>
                    <span onClick={() => {addReview()}}><FontAwesomeIcon style={{cursor:"pointer", position:"fixed", top:"125px", right:"290px", height:"25px", width:"25px"}} icon={faXmark} /></span>
                    <div className="postReviewContent">We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</div>
                    <div className="rate-box">
                        <input onChange={()=>setRating(5)} type="radio" name="star" id="star0"/>
                        <label className="star" for="star0"></label>
                        <input onChange={()=>setRating(4)} type="radio" name="star" id="star1" />
                        <label className="star" for="star1"></label>
                        <input onChange={()=>setRating(3)} type="radio" name="star" id="star2"/>
                        <label className="star" for="star2"></label>
                        <input onChange={()=>setRating(2)} type="radio" name="star" id="star3" />
                        <label className="star" for="star3"></label>
                        <input onChange={()=>setRating(1)} type="radio" name="star" id="star4" defaultChecked/>
                        <label className="star" for="star4"></label>
                    </div>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} cols="30" rows="6" placeholder="Tell us about your experience!"></textarea>
                </div>
                <div className='lowerPart'>
                    <div className="upload__box">
                            <label className="upload__btn">
                                <span className='uploadFont'><FontAwesomeIcon style={{height:"50px", width:"40px"}} icon={faImages} /></span>
                                <input onChange={(e) => appendImage(e)} type="file" accept='image/*' multiple data-max_length="20" className="upload__inputfile" />
                                {images?.map((image) => {
                                    return(
                                        <img src={URL.createObjectURL(image)} style={{marginLeft:"15px", height:"50px", width:"50px", contain:"content"}}/>
                                    )
                            })}
                            </label>
                        <div className="upload__img-wrap">
            
                        </div>
                    </div>
                    <div onClick={submitForm} className="postReviewSubmitBtn">Send</div>
                </div>
            </div>
        </div>
    )
}

export default PostReview