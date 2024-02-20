import React, { useState } from 'react'
import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
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
                {localStorage.getItem('token') ? <div className='myProfile'>
                    <span>My Profile</span>
                </div> : <></>}
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