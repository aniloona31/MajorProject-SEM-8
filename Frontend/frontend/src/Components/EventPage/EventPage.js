import React, { useEffect, useState } from 'react'
import './EventPage.css'
import { Oval } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EventPage() {

    const {id} = useParams();
    const [loader,setLoader] = useState(true);
    const [event,setEvent] = useState();

    useEffect(() => {
        const url = process.env.REACT_APP_ROOT_URL + `/event/get/${id}`
        console.log('called')
        axios.get(url,{
            headers:{
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if(res.status == 200){
                setEvent(res.data)
                setLoader(false);
            }
        }).catch((err) => {
            console.log(err);
            toast.error("error while fetching event");
            setLoader(false);
        })

    },[])

    const bookTicket = (e) =>{

    }
    return (
        <div className='eventPage'>
            {loader ? <div className='placeLoader'><Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /></div> : <>
                <ToastContainer />
                <div className='placeContainer'>
                    <div className='placeCard' style={{ backgroundImage: `linear-gradient(90deg, #1A1A1A 24.97%, #1A1A1A 38.3%, rgba(12, 12, 12, 0.041) 97.47%, #1A1A1A 100%), url(${event.mainImage})` }}>
                        <div className='leftPlace'>
                            <img style={{ height: "280px", width: "230px" }} src={event.mainImage} />
                        </div>
                        <div className='rightPlace'>
                            <div className='placeNamePage'>
                                <span>{event.eventName}</span>
                            </div>
                            <div className='placeRating'>
                                <span>{event.city}</span>
                            </div>
                            <div className='placeAddress'>{event.address}</div>
                            <div className='placePrice'><h3>Rs. {event.ticketPrice}</h3></div>
                            <button onClick={(e) => { bookTicket(e) }} className='bookButton'>
                                Book Ticket
                            </button>
                        </div>
                    </div>
                    <div className='lowerCard'>
                        <div className='description'>
                            <span className='aboutTheMovie'>About the Place</span>
                            <br />
                            <p>{event.discription}</p>
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default EventPage