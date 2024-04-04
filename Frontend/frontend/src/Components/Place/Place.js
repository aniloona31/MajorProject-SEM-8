import React, { useEffect, useState } from 'react'
import './Place.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Gallery from '../Gallery/Gallery';
import ReviewCard from '../ReviewCard/ReviewCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Scrollbar, Navigation, Pagination } from 'swiper/modules';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function Place() {

    const location = useLocation();
    const [place,setPlace] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        const url = process.env.REACT_APP_ROOT_URL + `/place/get/${location.state}`;

        axios.get(url,{
            headers: {
                'Content-Type' : "application/json"
            }
        }).then((res) => {
            console.log(res);
            if(res.status === 200){
                setPlace(res.data);
                setLoader(false);
            }
        }).catch((err)=>{
            toast.error("error while fetching place");
        })

    }, [])


    const { city, placeName} = useParams();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const [viewGallery, setViewGallery] = useState(false);

    const changeViewGallery = () => {
        setViewGallery(!viewGallery);
    }

    const bookTicket = (e) => {
        e.preventDefault();
        if(localStorage.getItem('token') === null){
            navigate('sign-in');
        }
        navigate(`/${placeName}/booking`,{state:location.state});
    }

    return (
        <>
            {loader ? <div className='placeLoader'><Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            /></div> : <>
                <ToastContainer/>
                {viewGallery === true ? <Gallery changeViewGallery={changeViewGallery} /> : <></>}
                <div className='placeContainer'>
                    <div className='placeCard' style={{backgroundImage: `linear-gradient(90deg, #1A1A1A 24.97%, #1A1A1A 38.3%, rgba(12, 12, 12, 0.041) 97.47%, #1A1A1A 100%), url(${place.mainImage})`}}>
                        <div className='leftPlace'>
                            <img style={{ height: "280px", width: "230px" }} src={place.mainImage} />
                        </div>
                        <div className='rightPlace'>
                            <div className='placeNamePage'>
                                <span>{place.placeName}</span>
                            </div>
                            <div className='placeRating'>
                                <span><span className='star'><FontAwesomeIcon style={{ color: "yellow", height: "20px", marginRight: "10px" }} icon={faStar} /></span>{place.rating==null ? 0.0 : Math.round(place.rating*10)/10}/5</span>
                            </div>
                            <div className='placeAddress'>{place.address}</div>
                            <div className='placePrice'><h3>Rs. {place.price}</h3></div>
                            <button onClick={(e) => { bookTicket(e) }} className='bookButton'>
                                Book Ticket
                            </button>
                        </div>
                    </div>
                    <div className='lowerCard'>
                        <div className='description'>
                            <span className='aboutTheMovie'>About the Place</span>
                            <br />
                            <p>{place.discription}</p>
                        </div>
                        <div className='customerPhotos'>
                            <p className='photoss'>Customer Photos</p>
                            <section>
                                {place?.reviews?.images?.map((photo, i) => {
                                    if (i === place.reviews.images.length - 1) {
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
                                    {place?.reviews?.map((review) => {
                                        return (
                                            <SwiperSlide>
                                                <ReviewCard review={review}/>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )
}

export default Place