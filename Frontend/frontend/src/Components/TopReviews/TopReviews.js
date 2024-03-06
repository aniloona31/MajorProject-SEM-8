import React from 'react'
import './TopReviews.css'
import ReviewCard from '../ReviewCard/ReviewCard'

const topReviews = [
  1, 2, 3
]

function TopReviews() {
  return (
    <div className='topReviewsContainer'>
      <div class="topReviews">
        <h2> Our Happy Clients </h2>
        <p class="topReviewsDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, atque? Repudiandae
          possimus asperiores hic nemo id a molestiae minus impedit!</p>
      </div>
      <div className='reviewss'>
        {topReviews.map((review) => {
          return (
            <ReviewCard />
          )
        })}
      </div>
    </div>
  )
}

export default TopReviews