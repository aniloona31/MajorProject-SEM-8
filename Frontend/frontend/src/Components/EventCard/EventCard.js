import React from 'react'
import './EventCard.css'
import { useNavigate } from 'react-router-dom'

function EventCard({event}) {

  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log('clicked')
    e.preventDefault();
    navigate(`/event/${event.id}`)
  }

  return (
    <div onClick={(e) => handleClick(e)} className='eventCard'>
        <img className="eventCardImage" src={event.mainImage}/>
        <span className='eventCardHeading'>EVENT</span>
        <div className='eventCardContent'>
            <span className='eventCardPlace'>{event.eventName}</span>
            <span className='eventCardCategory'>{event.city}</span>
        </div>
    </div>
  )
}

export default EventCard