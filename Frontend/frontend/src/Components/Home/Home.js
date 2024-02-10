import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Carousel from '../Carousel/MyCarousel'

function Home() {
  return (
    <div className='homeContainer'>
      <Navbar/>
      <Carousel/>
    </div>
  )
}

export default Home