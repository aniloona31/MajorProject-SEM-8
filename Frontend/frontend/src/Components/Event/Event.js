import React from 'react'
import './Event.css'
import EventCard from '../EventCard/EventCard'

const events = [
    {
        placeName : "Qutub Minar",
        rating : "4.5",
        imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
        category : "History"
    },
    {
        placeName : "Qutub Minar",
        rating : "4.5",
        imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
        category : "History"
    },
    {
        placeName : "Qutub Minar",
        rating : "4.5",
        imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
        category : "History"
    },
    {
        placeName : "Qutub Minar",
        rating : "4.5",
        imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
        category : "History"
    },
    {
        placeName : "Qutub Minar",
        rating : "4.5",
        imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
        category : "History"
    },
]

function Event() {
  return (
    <div className='eventContainer'>
        <p className='eventHeading'>Events</p>
        <div className='eventCards'>
            {events?.map((event) => {
                return(
                    <EventCard key={event.placeName} place={event}/>
                )
            })}
        </div>
    </div>
  )
}

export default Event