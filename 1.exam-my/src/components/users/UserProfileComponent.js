import React from 'react'
import {Link} from 'react-router-dom'
import queryString from 'querystring'
import Auth from './Auth'

class UserProfileComponent extends React.Component {
  constructor (props) {
    super (props)

    let userId = this.props.match.params.id
    let name = this.props.match.params.name

    this.state = {
      cars: [],
    }
  }

  render () {
    let cars = 'No cars available'

    if (this.state.cars.length > 0) {
      cars = this.state.cars.map((car) => (
        <div key={car.id} className='car-card-container'>
          <img src={car.image} alt='car' />
          <p>Make: {car.make}</p>
          <p>Model: {car.model}</p>
          <Link to={`/cars/details/${car.id}`}>See more details</Link>
        </div>
      ))
    }
    return (
        <div>Profile</div>
    )
  }
}

export default UserProfileComponent