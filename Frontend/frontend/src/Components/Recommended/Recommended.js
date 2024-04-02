import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import Card from '../Card/Card';
import { useStateValue } from '../../Context/StateProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// const topPlaces = [
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
//   {
//     placeName: "Qutub Minar",
//     rating: "4.5",
//     imageUrl: "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//     category: "History"
//   },
// ]

function Recommended() {

  const navigate = useNavigate();
  const [{ city }, dispatch] = useStateValue();
  const [topPlaces, setTopPlaces] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_ROOT_URL + `/place/all/places/${city}`

    axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      if (res.status === 200) {
        setTopPlaces(res.data);
      }
      console.log(res);
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data);
    })

  }, [])

  const goToPlaces = () => {
    navigate(`/explore/places/${city}`)
  }

  return (
    <div className='recommendContainer'>
      <ToastContainer/>
      <div className='heading'>
        <span className='recommendedPlace'>Recommended Places</span>
        <span onClick={() => goToPlaces()} className='showAllButton'>Show All</span>
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
        style={{ "padding-left": "44px" }}
      >
        {topPlaces?.map((place) => {
          return (
            <SwiperSlide>
              <Card key={place.placeName} place={place} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default Recommended