import React from 'react'
import './Recommended.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import Card from '../Card/Card';

const topPlaces = [
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

function Recommended() {
  return (
    <div className='recommendContainer'>
        <div className='heading'>
            <span className='recommendedPlace'>Recommended Places</span>
            <span className='showAllButton'>Show All</span>
        </div>
        <Swiper
        centeredSlides={false}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          769: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
        scrollbar={false}
        navigation={true}
        pagination={false}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper"
        style={{"padding-left":"44px"}}
      >
        {topPlaces?.map((place) => {
            return(
                <SwiperSlide>
                    <Card key={place.placeName} place={place}/>
                </SwiperSlide>
            )
        })}
      </Swiper>
    </div>
  )
}

export default Recommended