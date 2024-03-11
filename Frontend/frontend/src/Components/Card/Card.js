import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

function Card({place}) {

  const navigate = useNavigate();

  return (
    <div onClick={() => {navigate("/Mumbai/place/hanuman-mandir")}} className='card'>
        <img className="cardImage" src={place.imageUrl}/>
        <div className='cardContent'>
            <span className='cardRating'>{place.rating}</span>
            <span className='cardPlace'>{place.placeName}</span>
            <span className='cardCategory'>{place.category}</span>
        </div>
    </div>
  )
}

export default Card