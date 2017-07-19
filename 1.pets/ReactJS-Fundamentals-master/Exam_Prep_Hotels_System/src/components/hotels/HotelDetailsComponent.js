import React from 'react'
import toastr from 'toastr'

import HotelActions from '../../actions/HotelActions'
import HotelStore from '../../stores/HotelStore'
import HotelReviewsComponent from './HotelReviewsComponent'
import Input from '../common/forms/Input'
import FormHelpers from '../common/forms/FormHelpers'

class HotelDetailsComponent extends React.Component {
  constructor (props) {
    super(props)

    let hotelId = this.props.match.params.id

    this.state = {
      hotel: {},
      hotelId: hotelId,
      review: '',
      rating: 0,
      overalRating: 0,
      display: 'none'
    }

    this.handleDetailsHotel = this.handleDetailsHotel.bind(this)
    this.handleReviewAdd = this.handleReviewAdd.bind(this)
    this.handleReviewsEmitted = this.handleReviewsEmitted.bind(this)

    HotelStore.on(
      HotelStore.eventTypes.DETAILS_HOTEL_SERVED,
      this.handleDetailsHotel
    )

    HotelStore.on(
      HotelStore.eventTypes.REVIEW_ADDED,
      this.handleReviewAdd
    )

    HotelStore.on(
      HotelStore.eventTypes.REVIEWS_EMITTED,
      this.handleReviewsEmitted
    )
  }

  componentDidMount () {
    HotelActions.details(this.state.hotelId)
  }

  componentWillUnmount () {
    HotelStore.removeListener(
      HotelStore.eventTypes.DETAILS_HOTEL_SERVED,
      this.handleDetailsHotel
    )

    HotelStore.removeListener(
      HotelStore.eventTypes.REVIEW_ADDED,
      this.handleReviewAdd
    )

    HotelStore.removeListener(
      HotelStore.eventTypes.REVIEWS_EMITTED,
      this.handleReviewsEmitted
    )
  }

  handleDetailsHotel (data) {
    this.setState({hotel: data})
  }

  handleReviewsEmitted (reviews) {
    if (reviews.length > 0) {
      let totalReviewsSum = 0
      let totalReviewsCount = 0

      for (let review of reviews) {
        totalReviewsSum += review.rating
        totalReviewsCount++
      }

      this.setState({overalRating: (totalReviewsSum / totalReviewsCount).toFixed(1)})
    }
  }

  handleReviewChange (e) {
    FormHelpers.handleReviewChange.bind(this)(e, 'review')
  }

  handleRatingChange (e) {
    FormHelpers.handleReviewChange.bind(this)(e, 'rating')
  }

  handleReviewSubmit (e) {
    e.preventDefault()

    HotelActions.review(
      this.state.review,
      this.state.rating,
      this.state.hotelId
    )

    this.setState({review: ''})
  }

  handleReviewAdd (data) {
    if (!data.success) {
      toastr.error(data.message)
    } else {
      toastr.success(data.message)
      HotelActions.reviewsAll(data.review.id)
    }
  }

  switchDisplayReviews (e) {
    e.preventDefault()

      switch (this.state.display) {
        case 'none': {
          this.setState({display: 'block'})
          break
        }

        case 'block': {
          this.setState({display: 'none'})
          break
        }

        default:
          break
      }
  }

  render () {
    let hotel = this.state.hotel
    let viewReviewsBtn = this.state.display === 'none' ? 'view reviews' : 'hide reviews'

    return (
      <div>
        <h2>Details Component</h2>
        <div key={hotel.id} className='hotel-details-container'>
          <img src={hotel.image} alt='hotel' />
          <p>Name: {hotel.name}</p>
          <p>Location: {hotel.location}</p>
          <p>Description: {hotel.description}</p>
          <p>Number of rooms: {hotel.numberOfRooms}</p>
          <p>Parking slots: {
            hotel.parkingSlots ? hotel.parkingSlots : 'No information!'}</p>
          <p>
            Overal Rating: {
            this.state.overalRating ? this.state.overalRating : 'No votes yet!'}

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            {this.state.overalRating ? <button onClick={this.switchDisplayReviews.bind(this)}>
              {viewReviewsBtn}
            </button>
              : ''}

          </p>
          <form>
            <Input
              name='review'
              type='text'
              placeholder='Review'
              value={this.state.review}
              onChange={this.handleReviewChange.bind(this)} />
            <br />

            <Input
              name='rating'
              type='number'
              placeholder='Rating'
              value={this.state.rating}
              onChange={this.handleRatingChange.bind(this)} />
            <br />

            <input type='submit' onClick={this.handleReviewSubmit.bind(this)} value='Write Review' />
          </form>
        </div>

        <div style={{display: this.state.display}}>
          <HotelReviewsComponent hotelId={this.state.hotelId} />
        </div>
      </div>

    )
  }
}

export default HotelDetailsComponent
