import dispatcher from '../dispatcher'

const CarActions = {
  types: {
    CREATE_CAR: 'CREATE_CAR',
    ALL_CARS: 'ALL_CARS',
    DETAILS_CAR: 'DETAILS_CAR',
    REVIEW_CAR: 'REVIEW_CAR',
    REVIEWS_ALL: 'REVIEWS_ALL',
    EMIT_REVIEWS: 'EMIT_REVIEWS'
  },
  create (car) {
    dispatcher.dispatch({
      type: this.types.CREATE_CAR,
      car
    })
  },
  all (page) {
     page = page || 1
     dispatcher.dispatch({
       type: this.types.ALL_CARS,
       page
     })
   },
  details (carId) {
    dispatcher.dispatch({
      type: this.types.DETAILS_CAR,
      carId
    })
  },
  review (review, rating, like, carId) {
    dispatcher.dispatch({
      type: this.types.REVIEW_CAR,
      review,
      rating,
      like,
      carId
    })
  },
  reviewsAll (carId) {
    dispatcher.dispatch({
      type: this.types.REVIEWS_ALL,
      carId
    })
  },
  emitReviews (reviews) {
    dispatcher.dispatch({
      type: this.types.EMIT_REVIEWS,
      reviews
    })
  }
}

export default CarActions
