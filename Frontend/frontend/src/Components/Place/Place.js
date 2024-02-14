import React from 'react'
import './Place.css'
import { useParams } from 'react-router-dom'

function Place() {

  const {city,placeName} = useParams();

  return (
    <div>
        <h1>{placeName}</h1>
        <h2>{city}</h2>
    </div>
  )
}

export default Place