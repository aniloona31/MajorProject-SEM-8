import React from 'react'
import './MyCarousel.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const homeImages = [
    {
        placeName : "Taj Mahal",
        image : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/2560px-Taj_Mahal_%28Edited%29.jpeg"
    },
    {
        placeName : "Adiyogi",
        image : "https://t3.ftcdn.net/jpg/04/07/58/18/360_F_407581874_mKNEdzyrTzNBLQEP099y3TPCEaD7do3F.jpg"
    },
    {
        placeName : "Nandi Hills",
        image : "https://i0.wp.com/www.zingbus.com/blog/wp-content/uploads/2024/01/nandi-hills-sunrise-view-point-karnataka-1.jpg"
    },
] 

function MyCarousel() {
    return (
        <Carousel className="carousel" autoPlay={true} 
            infiniteLoop={true} 
            interval={3000} 
            stopOnHover={true} 
            dynamicHeight={false} 
            width="100%" 
            centerSlidePercentage={80} 
            centerMode={true}
            showThumbs={false}
            showStatus={false}>
            {homeImages?.map((item) => {
                return(
                    <div key={item.placeName} className='image'>
                        <img className="carouselImage" alt='Not Available' src={item.image}/>
                        <p className='placeName'>{item.placeName}</p>
                        {/* <p>lorem ipsum</p> */}
                    </div>
                )
            })}
        </Carousel>
    );
}

export default MyCarousel