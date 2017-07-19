import dispatcher from '../dispatcher'

const HotelActions = {
  types: {
    CREATE_HOTEL: 'CREATE_HOTEL',
    ALL_HOTELS: 'ALL_HOTELS',
    DETAILS_HOTEL: 'DETAILS_HOTEL',
    REVIEW_HOTEL: 'REVIEW_HOTEL',
    REVIEWS_ALL: 'REVIEWS_ALL',
    EMIT_REVIEWS: 'EMIT_REVIEWS'

  },
  create (hotel) {
    dispatcher.dispatch({
      type: this.types.CREATE_HOTEL,
      hotel
    })
  },
  all (page) {
    dispatcher.dispatch({
      type: this.types.ALL_HOTELS,
      page
    })
  },
  details (hotelId) {
    dispatcher.dispatch({
      type: this.types.DETAILS_HOTEL,
      hotelId
    })
  },
  review (review, rating, hotelId) {
    dispatcher.dispatch({
      type: this.types.REVIEW_HOTEL,
      review,
      rating,
      hotelId
    })
  },
  reviewsAll (hotelId) {
    dispatcher.dispatch({
      type: this.types.REVIEWS_ALL,
      hotelId
    })
  },
  emitReviews (reviews) {
    dispatcher.dispatch({
      type: this.types.EMIT_REVIEWS,
      reviews
    })
  }
}

export default HotelActions
