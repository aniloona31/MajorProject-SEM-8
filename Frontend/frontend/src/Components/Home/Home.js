import React, { useEffect } from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/MyCarousel'
import Recommended from '../Recommended/Recommended'
import Advertisement from '../Advertisment/Advertisement'
import Footer from '../Footer/Footer'
import Event from '../Event/Event'
import TopReviews from '../TopReviews/TopReviews'

function Home() {
  useEffect(() => {
    window.scrollTo(0,0);
  },[])
  return (
    <div className='homeContainer'>
      <Carousel/>
      <Recommended/>
      <Advertisement/>
      <Event/>
      <TopReviews/>
    </div>
  )
}

export default Home