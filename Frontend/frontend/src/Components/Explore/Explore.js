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
    const lower = [0, 201, 501, 1001];
    const upper = [200, 500, 1000, 1000000];
    const [{ city }, dispatch] = useStateValue();
    const [places, setPlaces] = useState([]);
    const { category } = useParams();
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const [price, setPrice] = useState({
        "1": false,
        "2": false,
        "3": false,
        "4": false
    })
    const [selectedCategories, setSelectedCategories] = useState({
        'Monuments': false,
        'Museums': false,
        'Galleries': false,
        'Libraries': false,
        'Temples': false,
        'Archeology': false
    })

    useEffect(() => {
        window.scrollTo(0, 0);
        navigate(`/explore/${category}/${city}`);
        const url = process.env.REACT_APP_ROOT_URL + `/place/all/${category}/${city}`;
        axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log("on explore", res);
            if (res.status === 200) {
                setPlaces(res.data);
                setLoader(false);
            }
        }).catch((error) => {
            console.log(error);
            toast.error(error.response.data);
            setLoader(false)
        })
    }, [city, category])

    const handleCategory = (category) => {
        let x = selectedCategories[category]

        setSelectedCategories((prev) => (
            { ...prev, [category]: !x }
        ));

    }

    const handlePrice = (key) => {
        let x = price[key];
        setPrice((prev) => (
            { ...prev, [key]: !x }
        ))
    }

    const priceRange = () => {
        let check = false;
        for (let i = 1; i <= 4; i++) {
            check |= price[i];
        }

        if (check == false) {
            return [];
        }
        let min = 10000, max = 0;
        for (let i = 1; i <= 4; i++) {
            if (price[i] == true) {
                min = Math.min(min, lower[i - 1]);
                max = Math.max(max, upper[i - 1]);
            }
        }
        return [min, max];
    }

    const categoriesChoosen = () => {
        let val = [];
        Object.entries(selectedCategories).map(([key, value]) => {
            if (value == true) {
                val.push(key);
            }
        })

        return val;
    }

    const applyFilter = async (e) => {
        e.preventDefault();
        setLoader(true);

        const url = process.env.REACT_APP_ROOT_URL + '/place/all/filter';
        const prices = priceRange();
        const categ = categoriesChoosen();
        const params = {};
        if (prices.length == 2) {
            params["min"] = prices[0];
            params["max"] = prices[1];
        }

        if (categ.length > 0) {
            params["categories"] = categ;
        }else{
            params["categories"] = categories;
        }
        params["city"] = city;

        try {
            const resp = await axios.get(url,{
                params:params,
                paramsSerializer:{
                    indexes: null
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(resp);
            if(resp.status == 200){
                setPlaces(resp.data);
                setLoader(false);
            }
        } catch(err) {
            console.log(err);
            toast.error("error while applying filter");
            setLoader(false);
        }

    }

    return (
        <div className='exploreTopContainer'>
            <ToastContainer />
            {Cities.find((item) => { return (item["label"] === city) }) == undefined
                ?
                <div className='invalidPlaceContainer'>
                    <p> City doesn't exist</p>
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
                                <div className='filterCategories'>
                                    {categories?.map((category) => {
                                        return (
                                            <button style={selectedCategories[category] == 1 ? { backgroundColor: "rgb(7,7,173)", color: "white" } : {}} onClick={() => { handleCategory(category) }}>{category}</button>
                                        )
                                    })}
                                </div>
                                <h3>Price Range</h3>
                                <div className='priceRange'>
                                    <ul>
                                        <li><input type='checkbox' onChange={() => handlePrice("1")} /> 0 - 200</li>
                                        <li><input type='checkbox' onChange={() => handlePrice("2")} /> 201 - 500</li>
                                        <li><input type='checkbox' onChange={() => handlePrice("3")} /> 501 - 1000</li>
                                        <li><input type='checkbox' onChange={() => handlePrice("4")} /> 1001+</li>
                                    </ul>
                                </div>
                                <div className='filterApply'>
                                    <button onClick={(e) => applyFilter(e)}>Apply</button>
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