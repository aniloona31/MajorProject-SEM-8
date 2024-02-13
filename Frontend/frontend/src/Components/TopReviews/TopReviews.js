import React from 'react'
import './TopReviews.css'
import ReviewCard from '../ReviewCard/ReviewCard'

const topReviews = [

]

function TopReviews() {
  return (
    <div class="topReviewsContainer">
        <h2> Our Happy Clients </h2>
        <p class="topReviewsDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, atque? Repudiandae
            possimus asperiores hic nemo id a molestiae minus impedit!</p>
        {/* {topReviews?.map((review) => {
            return(
                <ReviewCard review={review}/>
            )
        })} */}
        <ReviewCard/>
    </div>
  )
}

export default TopReviews