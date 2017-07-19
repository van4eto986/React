import React from 'react'
import toastr from 'toastr'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import CarReviewsComponent from './CarReviewsComponent'
import Input from '../common/forms/Input'
import FormHelpers from '../common/forms/FormHelpers'

class CarDetailsComponent extends React.Component {
  constructor (props) {
    super(props)

    let carId = this.props.match.params.id

    this.state = {
      car: {},
      carId: carId,
      review: '',
      rating: 0,
      like: 0,
      overalRating: 0,
      display: 'none'
    }

    this.handleDetailsCar = this.handleDetailsCar.bind(this)
    this.handleReviewAdd = this.handleReviewAdd.bind(this)
    this.handleReviewsEmitted = this.handleReviewsEmitted.bind(this)

    CarStore.on(
      CarStore.eventTypes.DETAILS_CAR_SERVED,
      this.handleDetailsCar
    )

    CarStore.on(
      CarStore.eventTypes.REVIEW_ADDED,
      this.handleReviewAdd
    )

    CarStore.on(
      CarStore.eventTypes.REVIEWS_EMITTED,
      this.handleReviewsEmitted
    )
  }

  componentDidMount () {
    CarActions.details(this.state.carId)
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.DETAILS_CAR_SERVED,
      this.handleDetailsCar
    )

    CarStore.removeListener(
      CarStore.eventTypes.REVIEW_ADDED,
      this.handleReviewAdd
    )

    CarStore.removeListener(
      CarStore.eventTypes.REVIEWS_EMITTED,
      this.handleReviewsEmitted
    )
  }

  handleDetailsCar (data) {
    this.setState({car: data})
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
      this.setState({like: totalReviewsCount})
    }
  }

  handleReviewChange (e) {
    FormHelpers.handleReviewChange.bind(this)(e, 'review')
  }

  handleRatingChange (e) {
    FormHelpers.handleReviewChange.bind(this)(e, 'rating')
  }

  handleLikeChange (e) {
    FormHelpers.handleReviewChange.bind(this)(e, 'like')
  }

  handleReviewSubmit (e) {
    e.preventDefault()

    CarActions.review(
      this.state.review,
      this.state.rating,
      this.state.like,
      this.state.carId
    )

    this.setState({review: ''})
  }

//   handleLikeSubmit (e) {
//     e.preventDefault()
//     CarActions.review(
//       this.state.like,
//       this.state.carId
//     )

//     this.setState({review: ''})
//   }

  handleReviewAdd (data) {
    if (!data.success) {
      toastr.error(data.message)
    } else {
      toastr.success(data.message)
      CarActions.reviewsAll(data.review.id)
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
    let car = this.state.car
    let viewReviewsBtn = this.state.display === 'none' ? 'view reviews' : 'hide reviews'

    return (
      <div>
        <h2>Details Component</h2>
        <div key={car.id} className='car-details-container'>
          <img src={car.image} alt='car' />
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <p>Year: {car.year}</p>
          <p>Engine: {car.engine}</p>
          <p>Price: {car.price}</p>
          <p>Mileage: {
            car.mileage ? car.mileage : 'No information!'}</p>
          <p>
            Overal Rating: {
            this.state.overalRating ? this.state.overalRating : 'No votes yet!'}

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            {this.state.overalRating ? <button onClick={this.switchDisplayReviews.bind(this)}>
              {viewReviewsBtn}
            </button>
              : ''}

          </p>
          <p>
            Likes: {this.state.like}
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

            <Input
              name='like'
              type='hidden'
              placeholder=''
              value= '1'
              onChange={this.handleLikeChange.bind(this)}/>
              
            <br />

            <input type='submit' onClick={this.handleReviewSubmit.bind(this)} value='Write Review' />
            <input type='submit' onClick={this.handleReviewSubmit.bind(this)} value='Like'/>
            
          </form>
        </div>

        <div style={{display: this.state.display}}>
          <CarReviewsComponent carId={this.state.carId} />
        </div>
      </div>
    )
  }
}

export default CarDetailsComponent

