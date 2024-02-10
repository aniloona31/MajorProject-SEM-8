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
        placeName : "Taj Mahal",
        image : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/2560px-Taj_Mahal_%28Edited%29.jpeg"
    },
    {
        placeName : "Taj Mahal",
        image : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/2560px-Taj_Mahal_%28Edited%29.jpeg"
    },
] 

function MyCarousel() {
    return (
        <Carousel autoPlay={true} 
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
                        <img alt='Not Available' src={item.image}/>
                        <p className='placeName'>{item.placeName}</p>
                    </div>
                )
            })}
        </Carousel>
    );
}

export default MyCarousel