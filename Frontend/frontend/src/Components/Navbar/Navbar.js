import React, { useState } from 'react'
import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleInfo, faMagnifyingGlass, faQuestion, faRightFromBracket, faTicket, faUser} from '@fortawesome/free-solid-svg-icons'
import Select from 'react-dropdown-select'
import { useNavigate } from 'react-router-dom'
import categories from '../../Utils/Categories'

const options = [
    { 
      value: 1,
      label: "Mumbai"
    },
    {
      value:  2,
      label: "Delhi"
    }
  ];

  const styles = {
    padding : "5px 15px 5px 15px",
    width: "180px"
  }


function Navbar() {
  
  const [option, setOption] = useState(options[0]);
  const navigate = useNavigate();

  const goToExplore = (category) => {
    console.log("category clicked")
    navigate(`/explore/${category}/${option.label}`);
  }

  const profileClick = () => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  }

  return (
    <div className='navbarContainer'>
        <div className='searchBar'>
            <div className='leftElements'>
                <span className='logo' onClick={()=>{console.log("home clicked");navigate("/Home")}}>GHUMANTU</span>
            </div>
            <div className='centreElements'>
                <span className='searchLogo'><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input type='text' placeholder='Search for Place'/>
            </div>
            <div className='rightElements'>
                <Select style={styles} dropdownHandle = {true} closeOnSelect = {true} options={options} onChange={(values)=>{setOption(values[0]['label'])}} value={option} placeholder={option.label}/>
                {localStorage.getItem('token') == null? <button onClick={() => {navigate("/sign-in")}} className='signInButton'>Sign in</button> : <></>}
                {localStorage.getItem('token') 
                ?
                <div onClick={() => profileClick()} className='profile'>
                  <div class="img-box">
                      <img src="https://i.postimg.cc/BvNYhMHS/user-img.jpg" alt="some user image" />
                  </div>
                  <div class="menu">
                      <ul>
                          <li><span onClick={()=>{}}><FontAwesomeIcon icon={faUser} />&nbsp;Profile</span></li>
                          <li><span onClick={()=>{}}><FontAwesomeIcon icon={faTicket} />&nbsp;Tickets</span></li>
                          <li><span onClick={()=>{}}><FontAwesomeIcon icon={faQuestion} />&nbsp;Q&A</span></li>
                          <li><span onClick={()=>{}}><FontAwesomeIcon icon={faCircleInfo} />&nbsp;Help</span></li>
                          <li><span onClick={()=>{}}><FontAwesomeIcon icon={faRightFromBracket} />&nbsp;Sign Out</span></li>
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