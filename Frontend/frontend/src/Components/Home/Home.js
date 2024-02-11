import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/MyCarousel'
import Recommended from '../Recommended/Recommended'

function Home() {
  return (
    <div className='homeContainer'>
      <Navbar/>
      <Carousel/>
      <Recommended/>
    </div>
  )
}

export default Home