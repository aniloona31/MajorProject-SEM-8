import React, { useEffect, useState } from 'react'
import './Event.css'
import EventCard from '../EventCard/EventCard'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Event() {

  const [events,setEvents] = useState([]);  
  const navigate = useNavigate();

  useEffect(() => {
    const url = process.env.REACT_APP_ROOT_URL + '/event/all';
    axios.get(url,{
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
        console.log('events are',res);
        if(res.status == 200){
            setEvents(res.data);
        }
    }).catch((err) => {
        console.log(err)
        toast.error("couldn't fetch events");
    })

  },[])


  return (
    <div className='eventContainer'>
        <ToastContainer/>
        <p className='eventHeading'>Events</p>
        <div className='eventCards'>
            {events.length>0 ? events.map((event) => {
                return(
                    <EventCard key={event.id} event={event}/>
                )
            }) : <h2 style={{marginTop:"-20px", color:"white"}}>No Recent Events</h2>}
        </div>
    </div>
  )
}

export default Event