import React, { useState } from 'react'
import './TicketCard.css'
import PostReview from '../PostReview/PostReview';

function TicketCard() {

  const[review,setReview] = useState(false);
  const addReview = () =>{
    setReview(!review);
  }

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
            <h1>SOUR Prom</h1>
          </div>
          <p className="location"><span>East High School</span>
            <span className="separator"><i className="far fa-smile"></i></span><span>Salt Lake City, Utah</span>
          </p>
        </div>
      </div>
      <div className="right">
        <div className="right-info-container">
          <span onClick={() => addReview()} className='reviewButton'>Add Review</span>
          <div className="barcode">
            <img src="https://external-preview.redd.it/cg8k976AV52mDvDb5jDVJABPrSZ3tpi1aXhPjgcDTbw.png?auto=webp&s=1c205ba303c1fa0370b813ea83b9e1bddb7215eb" alt="QR code"/>
          </div>
          <p className="ticket-number">
            #20030220
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default TicketCard