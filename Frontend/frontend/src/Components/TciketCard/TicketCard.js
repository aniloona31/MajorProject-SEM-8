import React, { useEffect, useState } from 'react'
import './TicketCard.css'
import PostReview from '../PostReview/PostReview';

function TicketCard({ticket}) {

  const[review,setReview] = useState(false);
  const addReview = () =>{
    setReview(!review);
  }

  useEffect(() => {
    console.log(ticket);
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
            <span>TUESDAY</span>
            <span className="june-29">JUNE 29TH</span>
            <span>2021</span>
          </p>
          <div className="show-name">
            <h1>{ticket.placeName}</h1>
          </div>
          <p className="location"><span>East High School</span>
            <span className="separator"><i className="far fa-smile"></i></span><span>Salt Lake City, Utah</span>
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