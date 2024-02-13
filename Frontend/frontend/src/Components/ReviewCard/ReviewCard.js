import React from 'react'
import './ReviewCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faRaStar} from '@fortawesome/free-regular-svg-icons'

function ReviewCard() {
  return (
    <div class="reviewSection">
            <div class="reviewItem">
                <div class="top">
                    <div class="clientImage">
                        <img src="./client.png" alt=""/>
                        <span>Raju Sheoran</span>
                    </div>
                    <ul>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faRaStar}/></li>
                        <li><FontAwesomeIcon icon={faRaStar}/></li>
                    </ul>
                </div>
                <article>
                    <p class="review">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit beatae ipsa
                        voluptatibus perferendis quos eaque nemo error tempora harum quas, laudantium tenetur, neque,
                        facere exercitationem!</p>
                    <p>Jan 01, 2023</p>
                </article>
            </div>

            <div class="reviewItem">
                <div class="top">
                    <div class="clientImage">
                        <img src="./client.png" alt=""/>
                        <span>Raju Sheoran</span>
                    </div>
                    <ul>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faRaStar}/></li>
                        <li><FontAwesomeIcon icon={faRaStar}/></li>
                    </ul>
                </div>
                <article>
                    <p class="review">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit beatae ipsa
                        voluptatibus perferendis quos eaque nemo error tempora harum quas, laudantium tenetur, neque,
                        facere exercitationem!</p>
                    <p>Jan 01, 2023</p>
                </article>
            </div>

            <div class="reviewItem">
                <div class="top">
                    <div class="clientImage">
                        <img src="./client.png" alt=""/>
                        <span>Raju Sheoran</span>
                    </div>
                    <ul> 
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faFaStar}/></li>
                        <li><FontAwesomeIcon icon={faRaStar}/></li>
                        <li><FontAwesomeIcon icon={faRaStar}/></li>
                    </ul>
                </div>
                <article>
                    <p class="review">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit beatae ipsa
                        voluptatibus perferendis quos eaque nemo error tempora harum quas, laudantium tenetur, neque,
                        facere exercitationem!</p>
                    <p>Jan 01, 2023</p>
                </article>
            </div>
    </div>
  )
}

export default ReviewCard