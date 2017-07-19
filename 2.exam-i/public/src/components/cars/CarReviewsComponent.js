import React from 'react'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'

class CarReviewsComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      reviews: [],
      carId: ''
    }

    this.handleReviewsData = this.handleReviewsData.bind(this)

    CarStore.on(
      CarStore.eventTypes.REVIEWS_ALL_SERVED,
      this.handleReviewsData
    )
  }

  componentDidMount () {
    this.setState({carId: this.props.carId})
    CarActions.reviewsAll(this.props.carId)
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.REVIEWS_ALL_SERVED,
      this.handleReviewsData
    )
  }

  handleReviewsData (data) {
    this.setState({reviews: data})

    CarActions.emitReviews(data)
  }

  render () {
    let reviews = 'No reviews for this Car yet!'

    if (this.state.reviews.length > 0) {
      reviews = this.state.reviews.map((review, index) => (
        <div key={index} className='review'>
          <p>From user: {review.user}</p>
          {
            review.comment ?
            <p>Review: {review.comment}</p> : <p>Review: <small>not commented</small></p>
          }
          <p>Rating: {review.rating}</p>
        </div>
      ))
    }

    return (
      <div>
        <h2>Total Reviews: {this.state.reviews.length}</h2>
        <div className='review-wrapper'>
          {reviews}
        </div>
      </div>
    )
  }
}

export default CarReviewsComponent
