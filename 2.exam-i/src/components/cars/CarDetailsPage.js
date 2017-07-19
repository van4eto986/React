import React from 'react'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import toastr from 'toastr'

class CarDetailsPage extends React.Component {
  constructor (props) {
    super(props)

    let id = this.props.match.params.id
    this.state = {
      car: {
        id
      },
      message: '',
      error: ''    
    }

    this.carDetailsFetched = this.carDetailsFetched.bind(this)    

    CarStore.on(
      CarStore.eventTypes.CAR_DETAILS_FETCHED, 
      this.carDetailsFetched
    )  
  }

  componentDidMount () {
    CarActions.details(this.state.car.id)
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CAR_DETAILS_FETCHED, 
      this.carDetailsFetched
    )    
  }

  carDetailsFetched (data) {      
    this.setState({
      car: data
    })
  }

  likeCar(id){
    CarActions.like(this.state.car.id)
    toastr.success('Car liked!')
  }

  deleteCar(){
    CarActions.delete(this.state.car.id)
    toastr.error('Car deleted!')
    this.props.history.push('/')
  }  

  render () {         
    return (
      <div>
        <img src={this.state.car.image} alt='car' />
        <h2>Make: {this.state.car.make}</h2>
        <p>Model: {this.state.car.model}</p>
        <p>Engine: {this.state.car.engine}</p>
        <p>Year: {this.state.car.year}</p>
        <p>Price: {this.state.car.price}</p>
        <p>Likes: {this.state.car.likes}</p>
        <button onClick={this.likeCar.bind(this)}>Like(not refresh)</button>
        <br/>
        <br/>
        <button onClick={this.deleteCar.bind(this)}>Delete</button>
      </div>
    )
  }
}

export default CarDetailsPage