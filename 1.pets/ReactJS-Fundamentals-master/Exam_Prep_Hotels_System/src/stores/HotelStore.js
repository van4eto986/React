import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

import HotelActions from '../actions/HotelActions'
import HotelData from '../data/HotelData'

class HotelStore extends EventEmitter {
  handleAction (action) {
    switch (action.type) {
      case HotelActions.types.CREATE_HOTEL: {
        this.createHotel(action.hotel)
        break
      }

      case HotelActions.types.ALL_HOTELS: {
        this.allHotels(action.page)
        break
      }

      case HotelActions.types.DETAILS_HOTEL: {
        this.detailsHotel(action.hotelId)
        break
      }

      case HotelActions.types.REVIEW_HOTEL: {
        this.reviewHotel(action.review, action.rating, action.hotelId)
        break
      }

      case HotelActions.types.REVIEWS_ALL: {
        this.reviewsAll(action.hotelId)
        break
      }

      case HotelActions.types.EMIT_REVIEWS: {
        this.emitReviews(action.reviews)
        break
      }

      default: break
    }
  }

  createHotel (hotel) {
    HotelData
      .createHotel(hotel)
      .then(data => this.emit(this.eventTypes.CREATED_HOTEL, data))
  }

  allHotels (page) {
    HotelData
      .allHotels(page)
      .then(data => this.emit(this.eventTypes.ALL_HOTELS_SERVED, data))
  }

  detailsHotel (hotelId) {
    HotelData
      .detailsHotel(hotelId)
      .then(data => this.emit(this.eventTypes.DETAILS_HOTEL_SERVED, data))
  }

  reviewHotel (review, rating, hotelId) {
    HotelData
      .reviewHotel(review, rating, hotelId)
      .then(data => this.emit(this.eventTypes.REVIEW_ADDED, data))
  }

  reviewsAll (hotelId) {
    HotelData
      .reviewsAll(hotelId)
      .then(data => this.emit(this.eventTypes.REVIEWS_ALL_SERVED, data))
  }

  emitReviews (reviews) {
    this.emit(this.eventTypes.REVIEWS_EMITTED, reviews)
  }
}

let hotelStore = new HotelStore()

hotelStore.eventTypes = {
  CREATED_HOTEL: 'created_hotel',
  ALL_HOTELS_SERVED: 'all_hotels_served',
  DETAILS_HOTEL_SERVED: 'details_hotel_served',
  REVIEW_ADDED: 'review_added',
  REVIEWS_ALL_SERVED: 'reviews_all_served',
  REVIEWS_EMITTED: 'reviews_emitted'
}

dispatcher.register(hotelStore.handleAction.bind(hotelStore))

export default hotelStore
