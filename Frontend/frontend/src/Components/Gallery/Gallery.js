import React from 'react'
import './Gallery.css'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Gallery({images,changeViewGallery}) {
  return (
    <div className='galleryContainer'>
        <div onClick={() => {changeViewGallery()}} className="galleryClose">
            <FontAwesomeIcon style={{height:"50px", width:"50px", position:"absolute", top:"20px", right:"40px", color:"white", cursor:"pointer"}} icon={faXmark} />
        </div>
        <main class="gallery gallery__content--flow">
        {images?.map((image) => {
            return (
                <figure>
                    <img className='galleryImage' src={image}/>
                </figure>
            )
        })}
    </main>
    </div>
  )
}

export default Gallery