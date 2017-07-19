import {EventEmitter} from 'events'
import dispatcher from '../dispatcher'
import CarActions from '../actions/CarActions'
import CarData from '../data/CarData'

class CarStore extends EventEmitter {
  create (car) {
    CarData.create(car)
      .then(data => this.emit(this.eventTypes.CAR_CREATED, data))
  }

  all (page) {
    page = page || 1
    CarData.all(page)
      .then(data => this.emit(this.eventTypes.CARS_FETCHED, data))
  }

  details (id) {
    CarData.details(id)
      .then(data => this.emit(this.eventTypes.CAR_DETAILS_FETCHED, data))
  }

  like (id) {
    CarData.like(id)
      .then(data => this.emit(this.eventTypes.CAR_LIKE_FETCHED, data))
  } 

  delete (id) {
    CarData.delete(id)
      .then(data => this.emit(this.eventTypes.CAR_DELETE_FETCHED, data))
  } 

  handleAction (action) {
    switch (action.type) {
      case CarActions.types.CREATE_CAR: {
        this.create(action.car)
        break
      }
      case CarActions.types.ALL_CARS: {
        this.all(action.page)
        break
      }
      case CarActions.types.DETAILS: {
        this.details(action.id)
        break
      }
      case CarActions.types.LIKE: {
        this.like(action.id)
        break 
      }
      case CarActions.types.DELETE: {
        this.delete(action.id)
        break
      }    
      default: break
    }
  }
}

let carStore = new CarStore()
carStore.eventTypes = {
  CAR_CREATED: 'car_created',
  CARS_FETCHED: 'cars_fetched',
  CARS_DETAILS_FETCHED: 'cars_details_fetched',
  CAR_LIKE_FETCHED: 'car_like_fetched',
  CAR_DELETE_FETCHED: 'car_delete_fetched' 
}
dispatcher.register(carStore.handleAction.bind(carStore))
export default carStore