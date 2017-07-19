import React from 'react'

import HotelActions from '../../actions/HotelActions'
import HotelStore from '../../stores/HotelStore'

class HotelReviewsComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      reviews: [],
      hotelId: ''
    }

    this.handleReviewsData = this.handleReviewsData.bind(this)

    HotelStore.on(
      HotelStore.eventTypes.REVIEWS_ALL_SERVED,
      this.handleReviewsData
    )
  }

  componentDidMount () {
    this.setState({hotelId: this.props.hotelId})
    HotelActions.reviewsAll(this.props.hotelId)
  }

  componentWillUnmount () {
    HotelStore.removeListener(
      HotelStore.eventTypes.REVIEWS_ALL_SERVED,
      this.handleReviewsData
    )
  }

  handleReviewsData (data) {
    this.setState({reviews: data})

    HotelActions.emitReviews(data)
  }

  render () {
    let reviews = 'No reviews for this Hotel yet!'

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

export default HotelReviewsComponent
