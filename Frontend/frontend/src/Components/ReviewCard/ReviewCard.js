import React, { useEffect } from 'react'
import './ReviewCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faFaStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faRaStar } from '@fortawesome/free-regular-svg-icons'

function ReviewCard({ review }) {

    const date = new Date(review.date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let list = [];
    for (let index = 0; index < review.rating; index++) {
        list.push(<li><FontAwesomeIcon icon={faFaStar} /></li>)
    }

    for (let index = review.rating; index < 5; index++) {
        list.push(<li><FontAwesomeIcon icon={faRaStar} /></li>)
    }


    return (
        <div class="reviewSection">
            <div class="reviewItem">
                <div class="top">
                    <ul>
                        {list}
                    </ul>
                </div>
                <article>
                    <p class="review">{review.description}</p>
                    <p>{months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
                </article>
            </div>
        </div>
    )
}

export default ReviewCard