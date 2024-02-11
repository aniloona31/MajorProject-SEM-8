import React from 'react'
import './Card.css'

function Card({place}) {

  return (
    <div className='card'>
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