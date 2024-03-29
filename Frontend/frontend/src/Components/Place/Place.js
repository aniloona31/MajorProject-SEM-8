import React, { useState } from 'react'
import './Place.css'
import { useNavigate, useParams } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Gallery from '../Gallery/Gallery';
import ReviewCard from '../ReviewCard/ReviewCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';

const reviews = [
    { "review": "yooy" },
    { "review": "yooy" },
    { "review": "yooy" },
    { "review": "yooy" },
    { "review": "yooy" }
];

const photos = [
    "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4xBy25QhsXKnSDTBvupM7k/46fc453dc3f9434167601fdfe1ed9a22/meta-image-general.jpg",
    "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4xBy25QhsXKnSDTBvupM7k/46fc453dc3f9434167601fdfe1ed9a22/meta-image-general.jpg",
    "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4xBy25QhsXKnSDTBvupM7k/46fc453dc3f9434167601fdfe1ed9a22/meta-image-general.jpg",
    "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4xBy25QhsXKnSDTBvupM7k/46fc453dc3f9434167601fdfe1ed9a22/meta-image-general.jpg",
    "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4xBy25QhsXKnSDTBvupM7k/46fc453dc3f9434167601fdfe1ed9a22/meta-image-general.jpg"
]

function Place() {

    const { city, placeName, placeId } = useParams();
    const navigate = useNavigate();
    const [viewGallery, setViewGallery] = useState(false);

    const changeViewGallery = () => {
        setViewGallery(!viewGallery);
    }

    const bookTicket = (e) =>{
        e.preventDefault();
        navigate(`/${placeName}/1/booking`);
    }

    return (
        <>
            {viewGallery === true ? <Gallery changeViewGallery={changeViewGallery} /> : <></>}
            <div className='placeContainer'>
                <div className='placeCard'>
                    <div className='leftPlace'>
                        <img style={{ height: "280px", width: "230px" }} src="https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg" />
                    </div>
                    <div className='rightPlace'>
                        <div className='placeNamePage'>
                            <span>Qutub Minar</span>
                        </div>
                        <div className='placeRating'>
                            <span><span className='star'><FontAwesomeIcon style={{ color: "yellow", height: "20px", marginRight: "10px" }} icon={faStar} /></span>4.3/5</span>
                        </div>
                        <div className='placeAddress'>lorem ipsum</div>
                        <div className='placePrice'><h3>Rs. 400</h3></div>
                        <button onClick={(e) => {bookTicket(e)}} className='bookButton'>
                            Book Ticket
                        </button>
                    </div>
                </div>
                <div className='lowerCard'>
                    <div className='description'>
                        <span className='aboutTheMovie'>About the Place</span>
                        <br />
                        <p>lorem ipsum you are bhishm you got issues le me handle.</p>
                    </div>
                    <div className='customerPhotos'>
                        <p className='photoss'>Customer Photos</p>
                        <section>
                            {photos?.map((photo, i) => {
                                if (i === photos.length - 1) {
                                    return (
                                        <div onClick={() => { changeViewGallery() }} style={{ backgroundColor: "grey", backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png)` }} className={`box box-${i}`}></div>
                                    )
                                } else {
                                    return (
                                        <div style={{ backgroundImage: `url(${photo})` }} className={`box box-${i}`}></div>
                                    )
                                }
                            })}
                        </section>
                    </div>
                    <div className='reviews'>
                        <p className='photoss'>Customer Reviews</p>
                        <div className='reviewSwipper'>
                            <Swiper
                                centeredSlides={false}
                                grabCursor={true}
                                keyboard={{
                                    enabled: true,
                                }}
                                breakpoints={{
                                    769: {
                                        slidesPerView: 3,
                                        slidesPerGroup: 3,
                                    },
                                }}
                                Scrollbar={false}
                                navigation={true}
                                pagination={false}
                                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                                className="reviewSwipper"
                                style={{ "padding-left": "25px" }}
                            >
                                {reviews?.map((review) => {
                                    return (
                                        <SwiperSlide>
                                            <ReviewCard />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Place