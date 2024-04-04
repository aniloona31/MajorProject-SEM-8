import React, { useEffect, useState } from 'react'
import './Explore.css'
import Cities from '../../Utils/Cities';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Card/Card';
import categories from '../../Utils/Categories';
import { useStateValue } from '../../Context/StateProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

// const places = [
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     },
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     },
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     },
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     },
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     },
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     },
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     },
//     {
//         placeName : "Qutub Minar",
//         rating : "4.5",
//         imageUrl : "https://images.pexels.com/photos/13385089/pexels-photo-13385089.jpeg?cs=srgb&dl=pexels-sanjay-kareer-13385089.jpg&fm=jpg",
//         category : "History"
//     }
// ];


function Explore() {

    const [{ city }, dispatch] = useStateValue();
    const [places, setPlaces] = useState([]);
    const { category } = useParams();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    //   console.log(category)

    useEffect(() => {
        window.scrollTo(0,0);
        navigate(`/explore/${category}/${city}`);
        const url = process.env.REACT_APP_ROOT_URL + `/place/all/${category}/${city}`;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            // console.log(res);
            if (res.status === 200) {
                setPlaces(res.data);
                setLoader(false);
            }
        }).catch((error) => {
            // console.log(error);
            toast.error(error.response.data);
            setLoader(false)
        })
    }, [city,category])

    return (
        <div className='exploreTopContainer'>
            <ToastContainer />
            {Cities.find((item) => { return (item === city) }) == undefined
                ?
                <div className='invalidPlaceContainer'>
                    <p>place doesn't exist</p>
                </div>
                :
                categories.find((item) => { return (item === category || category === "places") }) == undefined
                    ?
                    <div className='invalidPlaceContainer'>
                        <p>Category doesn't exist</p>
                    </div>
                    :
                    <div className='exploreContainer'>
                        <div className='filterContainer'>
                            <h1>Filter</h1>
                            <div>
                                <h3>Category</h3>
                                <div>
                                    {categories?.map((category) => {
                                        return (
                                            <button>{category}</button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='placesContainer'>
                            <h1>{category} In {city}</h1>
                            {loader ? <Oval
                                visible={true}
                                height="80"
                                width="80"
                                color="#4fa94d"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            /> :
                                <div className='allPlaces'>
                                    {places?.map((place) => {
                                        return (
                                            <div className='eachPlace'>
                                                <Card key={place.placeName} place={place} />
                                            </div>
                                        )
                                    })}
                                </div>}
                        </div>
                    </div>}
        </div>
    )
}

export default Explore