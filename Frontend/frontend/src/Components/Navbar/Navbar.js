import React, { useRef, useState } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faLandmark, faMagnifyingGlass, faQuestion, faRightFromBracket, faTicket, faUser } from '@fortawesome/free-solid-svg-icons'
import Select from 'react-dropdown-select'
import { useNavigate } from 'react-router-dom'
import categories from '../../Utils/Categories'
import { useStateValue } from '../../Context/StateProvider'
import cities from '../../Utils/Cities'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'


const styles = {
  padding: "5px 15px 5px 15px",
  width: "180px"
}


function Navbar() {

  const [{ city }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  const goToExplore = (category) => {
    navigate(`/explore/${category}/${city}`);
  }

  const profileClick = () => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }

  const signOut = () => {
    localStorage.clear('token');
    navigate("/Home");
  }

  const setCity = (values) => {
    dispatch({
      type: "SET_CITY",
      payload: values[0]['label']
    })
  }

  const debounce = (cb, delay = 1000) => {
    let timeout
    return (text) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(text);
      }, delay);
    }
  }

  const searchPlaces = debounce((text) => {
    // console.log(text);
    if (text === "") {
      setSearchResults([]);
      return;
    }
    const url = process.env.REACT_APP_ROOT_URL + '/place/search';
    axios.get(url, {
      params: {
        "place": text
      },
      headers: {
        "Content-Type": "appliction/json"
      }
    }).then((res) => {
      // console.log(res);
      if (res.status == 200) {
        setSearchResults(res.data);
      }
    }).catch((err) => {
      // console.log(err);
      toast.error("couldn't search places");
    })
  }, 500)

  const handleChange = (e) => {
    searchPlaces(e.target.value);
  }

  const goToPlace = (item) =>{
    inputRef.current.value = '';
    setSearchResults([]);
    navigate(`/${item.city}/place/${item.placeName}`,{state:item.id});
  }

  return (
    <div className='navbarContainer'>
      <ToastContainer />
      <div className='searchBar'>
        <div className='leftElements'>
          <span className='logo' onClick={() => { console.log("home clicked"); navigate("/Home") }}>GHUMANTU</span>
        </div>
        <div className='centreElements'>
          <span className='searchLogo'><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <input ref={inputRef} type='text' placeholder='Search for Place' onChange={(e) => handleChange(e)} />
          {searchResults.length > 0 ?
            <div className='searchResults'>
              {searchResults?.map((item) => {
                return (
                  <>
                    <div onClick={() => {goToPlace(item)}}><span style={{marginRight:"10px"}}><FontAwesomeIcon icon={faLandmark} /></span>{item.placeName} ({item.city})</div>
                  </>
                )
              })}
            </div> :
            <></>}
        </div>
        <div className='rightElements'>
          <Select style={styles} dropdownHandle={true} closeOnSelect={true} options={cities} onChange={(values) => { setCity(values) }} value={city} placeholder={city} />
          {localStorage.getItem('token') == null ? <button onClick={() => { navigate("/sign-in") }} className='signInButton'>Sign in</button> : <></>}
          {localStorage.getItem('token')
            ?
            <div onClick={() => profileClick()} className='profile'>
              <div class="img-box">
                <img src="https://i.postimg.cc/BvNYhMHS/user-img.jpg" alt="some user image" />
              </div>
              <div class="menu">
                <ul>
                  <li><span onClick={() => { }}><FontAwesomeIcon icon={faUser} />&nbsp;Profile</span></li>
                  <li><span onClick={() => { navigate("/my-tickets") }}><FontAwesomeIcon icon={faTicket} />&nbsp;Tickets</span></li>
                  <li><span onClick={() => { navigate("/q&a") }}><FontAwesomeIcon icon={faQuestion} />&nbsp;Q&A</span></li>
                  <li><span onClick={() => { }}><FontAwesomeIcon icon={faCircleInfo} />&nbsp;Help</span></li>
                  <li><span onClick={() => { signOut() }}><FontAwesomeIcon icon={faRightFromBracket} />&nbsp;Sign Out</span></li>
                </ul>
              </div>
            </div>
            : <></>}
        </div>
      </div>
      <div className='optionBar'>
        <div className='options'>
          {categories?.map((category) => {
            return (
              <span onClick={() => goToExplore(category)}>{category}</span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navbar