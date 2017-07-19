import dispatcher from '../dispatcher'

const carActions = {
  types: {
    CREATE_CAR: 'CREATE_CAR',
    ALL_CARS: 'ALL_CARS',
    DETAILS: 'DETAILS',
    LIKE: 'LIKE',
    DELETE: 'DELETE'    
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
  details (id) {
    dispatcher.dispatch({
      type: this.types.DETAILS,
      id
    })    
  },
  like (id) {
    dispatcher.dispatch({
      type: this.types.LIKE,
      id
    })
  },
  delete (id) {
    dispatcher.dispatch({
      type: this.types.DELETE,
      id
    })
  } 
}

export default carActions
