import React, { useEffect } from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Card({place}) {

  const navigate = useNavigate();

  return (
    <div onClick={() => {navigate(`/${place.city}/place/${place.placeName}`,{state:place.id})}} className='card'>
        <img className="cardImage" src={place.mainImage}/>
        <div className='cardContent'>
        <span><span className='star'><FontAwesomeIcon style={{ color: "yellow", height: "20px", marginRight: "10px" }} icon={faStar} /></span>{place.rating == null ? 0.0 : Math.round(place.rating * 10) / 10}/5</span>
            <span className='cardPlace'>{place.placeName}</span>
            <span className='cardCategory'>{place.category}</span>
        </div>
    </div>
  )
}
 
export default Card