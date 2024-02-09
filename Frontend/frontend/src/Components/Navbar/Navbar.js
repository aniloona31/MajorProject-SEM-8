import React, { useState } from 'react'
import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Select from 'react-dropdown-select'

const options = [
    { 
      value: 1,
      label: "Rajasthan"
    },
    {
      value:  2,
      label: "Delhi"
    }
  ];

function Navbar() {
  
  const [option, setOption] = useState(options[0]);
  
  return (
    <div className='navbarContainer'>
        <div className='searchBar'>
            <div className='leftElements'>
                <span className='logo'>GHUMANTU</span>
            </div>
            <div className='centreElements'>
                <span className='searchLogo'><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input type='text' placeholder='Search for Place'/>
            </div>
            <div className='rightElements'>
                <Select dropdownHandle = {true} closeOnSelect = {true} options={options} onChange={(values)=>{setOption(values[0]['label'])}} value={option} placeholder="Select An Option"/>
                <button className='signInButton'>Sign in</button>
                <div className='myProfile'>
                    <span>My Profile</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar