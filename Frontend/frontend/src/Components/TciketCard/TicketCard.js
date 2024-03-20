import React, { useEffect, useState } from 'react'
import './TicketCard.css'
import PostReview from '../PostReview/PostReview';

function TicketCard({ticket}) {

  const[review,setReview] = useState(false);
  const[date, setDate] = useState(new Date(ticket.bookedDates[0]));

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const addReview = () =>{
    setReview(!review);
  }

  useEffect(() => {
    // const date = new Date(ticket.bookedDates[0]);
    // // console.log(ticket.bookedDates[0].getDay());
    // console.log(date);
    console.log(ticket)
  },[])

  return (
    <>
    {review && <PostReview addReview={addReview}/>}
    <div className="ticket created-by-anniedotexe">
      <div className="left">
        <div className="ticketImage">
          <img src='https://media.pitchfork.com/photos/60db53e71dfc7ddc9f5086f9/1:1/w_1656,h_1656,c_limit/Olivia-Rodrigo-Sour-Prom.jpg'/>
        </div>
        <div className="ticket-info">
          <p className="date">
            <span>{weekday[date.getDay()]}</span>
            <span className="june-29">{month[date.getMonth()]}  {date.getDate()}</span>
            <span>{date.getFullYear()}</span>
          </p>
          <div className="show-name">
            <h1>{ticket.placeName}</h1>
          </div>
          <p className="location"><span>Quantity: {ticket.quantity}</span>
            <span className="separator"><i className="far fa-smile"></i></span><span>Price: Rs.{ticket.price}</span>
          </p>
        </div>
      </div>
      {ticket.confirmation ? <div className="right">
        <div className="right-info-container">
          <span onClick={() => addReview()} className='reviewButton'>Add Review</span>
          <div className="barcode">
            <img src={`data:image/png;base64,${ticket.ticketQr}`} alt="QR code"/>
          </div>
          <p style={{marginTop:"-10px"}} className="ticket-number">
            {ticket.ticketId.substring(14)}
          </p>
        </div>
      </div>:<div style={{color:"red", paddingLeft:"50px", fontWeight:"700"}}>CANCELED</div>}
    </div>
    </>
  )
}

export default TicketCard