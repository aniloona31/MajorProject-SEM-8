import React from 'react'
import './PostReview.css'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PostReview() {
    return (
        <div className='mainWrapper'>
            <div className='mainReviewContainer'>
                <div className="postReviewContainer">
                    <div className="postReviewTitle">Rate your experience</div>
                    <div className="postReviewContent">We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.</div>
                    <div className="rate-box">
                        <input type="radio" name="star" id="star0" />
                        <label className="star" for="star0"></label>
                        <input type="radio" name="star" id="star1" />
                        <label className="star" for="star1"></label>
                        <input type="radio" name="star" id="star2" checked="checked" />
                        <label className="star" for="star2"></label>
                        <input type="radio" name="star" id="star3" />
                        <label className="star" for="star3"></label>
                        <input type="radio" name="star" id="star4" />
                        <label className="star" for="star4"></label>
                    </div>
                    <textarea cols="30" rows="6" placeholder="Tell us about your experience!"></textarea>
                </div>
                <div className='lowerPart'>
                    <div className="upload__box">
                            <label className="upload__btn">
                                <span className='uploadFont'><FontAwesomeIcon style={{height:"50px", width:"30px"}} icon={faImages} /></span>
                                <input type="file" multiple="" data-max_length="20" className="upload__inputfile" />
                            </label>
                        <div className="upload__img-wrap"></div>
                    </div>
                    <div className="postReviewSubmitBtn">Send</div>
                </div>
            </div>
        </div>
    )
}

export default PostReview