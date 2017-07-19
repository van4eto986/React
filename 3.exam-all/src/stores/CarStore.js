import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

import CarActions from '../actions/CarActions'
import CarData from '../data/CarData'

class CarStore extends EventEmitter {
  handleAction (action) {
    switch (action.type) {
      case CarActions.types.CREATE_CAR: {
        this.createCar(action.car)
        break
      }
      case CarActions.types.ALL_CARS: {
         this.allCars(action.page)
         break
       }

      case CarActions.types.DETAILS_CAR: {
        this.detailsCar(action.carId)
        break
      }

      case CarActions.types.REVIEW_CAR: {
        this.reviewCar(action.review, action.rating, action.like, action.carId)
        break
      }

      case CarActions.types.REVIEWS_ALL: {
        this.reviewsAll(action.carId)
        break
      }

      case CarActions.types.EMIT_REVIEWS: {
        this.emitReviews(action.reviews)
        break
      }

      default: break
    }
  }
  createCar (car) {
    CarData
      .createCar(car)
      .then(data => this.emit(this.eventTypes.CREATED_CAR, data))
  }
  allCars (page) {
     CarData
       .allCars(page)
       .then(data => this.emit(this.eventTypes.ALL_CARS_SERVED, data))
   }
  
  detailsCar (carId) {
    CarData
      .detailsCar(carId)
      .then(data => this.emit(this.eventTypes.DETAILS_CAR_SERVED, data))
  }

  reviewCar (review, rating, like, carId) {
    CarData
      .reviewCar(review, rating, like, carId)
      .then(data => this.emit(this.eventTypes.REVIEW_ADDED, data))
  }

  reviewsAll (carId) {
    CarData
      .reviewsAll(carId)
      .then(data => this.emit(this.eventTypes.REVIEWS_ALL_SERVED, data))
  }

  emitReviews (reviews) {
    this.emit(this.eventTypes.REVIEWS_EMITTED, reviews)
  }
}

let carStore = new CarStore()
carStore.eventTypes = {
  CREATED_CAR: 'created_car',
  ALL_CARS_SERVED: 'all_cars_served',
  DETAILS_CAR_SERVED: 'details_car_served',
  REVIEW_ADDED: 'review_added',
  REVIEWS_ALL_SERVED: 'reviews_all_served',
  REVIEWS_EMITTED: 'reviews_emitted'
}

dispatcher.register(carStore.handleAction.bind(carStore))
export default carStore
