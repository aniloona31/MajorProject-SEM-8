import React from 'react'
import './TopReviews.css'
import ReviewCard from '../ReviewCard/ReviewCard'

const topReviews = [
  {
    rating: 5,
    description: "Lorem ipsum dolor sit amet. Et reiciendis molestias et commodi corrupti et provident sint qui iste voluptatem et consequatur velit. Rem voluptatum deserunt ab voluptatem sapiente aut aspernatur quibusdam ut officia iusto.",
    date: "2024-01-16"
  },
  {
    rating: 4,
    description: "Lorem ipsum dolor sit amet. Et reiciendis molestias et commodi corrupti et provident sint qui iste voluptatem et consequatur velit. Rem voluptatum deserunt ab voluptatem sapiente aut aspernatur quibusdam ut officia iusto.",
    date: "2024-02-24"
  },
  {
    rating: 5,
    description: "Lorem ipsum dolor sit amet. Et reiciendis molestias et commodi corrupti et provident sint qui iste voluptatem et consequatur velit. Rem voluptatum deserunt ab voluptatem sapiente aut aspernatur quibusdam ut officia iusto.",
    date: "2024-01-24"
  }
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
            <ReviewCard review={review} />
          )
        })}
      </div>
    </div>
  )
}

export default TopReviews