import React from 'react'
import './EventCard.css'

function EventCard({place}) {

  return (
    <div className='eventCard'>
        <img className="eventCardImage" src={place.imageUrl}/>
        <span className='eventCardHeading'>EVENT</span>
        <div className='eventCardContent'>
            <span className='eventCardRating'>{place.rating}</span>
            <span className='eventCardPlace'>{place.placeName}</span>
            <span className='eventCardCategory'>{place.category}</span>
        </div>
    </div>
  )
}

export default EventCard