import React from 'react'
import './Place.css'
import { useParams } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const reviews = [
    {"review" : "yooy"}
];

function Place() {

  const {city,placeName} = useParams();

  return (
    <div className='placeContainer'>
        <div className='placeCard'>
            <div className='leftPlace'>
                <img style={{height:"280px", width:"230px"}} src="https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg"/>
            </div>
            <div className='rightPlace'>
                <div className='name'>
                    <p>Qutub Minar</p>
                </div>
                <div className='placeRating'>
                    <p><span><FontAwesomeIcon icon={faStar} /></span>4.3/5</p>
                </div>
                <div className='placeAddress'>lorem ipsum</div>
                <div className='placePrice'><h3>Rs. 400</h3></div>
                <button className='bookButton'>
                    Book Ticket
                </button>
            </div>
        </div>
        <div className='description'>
            <p>About the Place</p>
            <p>lorem ipsum you are bhishm you got issues le me handle.</p>
        </div>
        <div className='customerPhotos'>
            <p>Customer Photos</p>
        </div>
        <div className='reviews'>
            {reviews?.map((review) => {
                return (
                    <div className='placeReview'>
                        <span>4 <p>hey this is my review</p></span>
                        <p>username</p>
                    </div>
                )
            })}
            {reviews.length>3 ? <button className='allReviewsButton'>Show All Reviews</button> : <></>}
        </div>
        <p>{city}</p>
    </div>
  )
}

export default Place