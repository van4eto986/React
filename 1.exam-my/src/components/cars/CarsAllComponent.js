import React from 'react'
import {Link} from 'react-router-dom'
import queryString from 'querystring'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'

class CarsAllComponent extends React.Component {
  constructor (props) {
    super (props)

    const query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1

    this.state = {
      cars: [],
      page: page,
      disabledPrev: true,
      disabledNext: false
    }

    this.handleCarsData = this.handleCarsData.bind(this)

    CarStore.on(
      CarStore.eventTypes.ALL_CARS_SERVED,
      this.handleCarsData
    )
  }

  componentDidMount () {
    CarActions.all(this.state.page)
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.ALL_CARS_SERVED,
      this.handleCarsData
    )
  }

  handleCarsData (data) {
    this.setState({cars: data})

    if (this.state.cars.length < 1 || this.state.page < 2) {
      this.setState({
        disabledPrev: true,
        disabledNext: false
      })
    }

    else if (
      this.state.cars.length === 0 ||
      this.state.cars.length < 10) {
      this.setState({
        disabledPrev: false,
        disabledNext: true
      })
    }
  }

  goToPrevPage () {
    if (this.state.cars.length < 1 || this.state.page < 2) {
      return
    }

    let page = this.state.page
    page--

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    CarActions.all(page)
  }

  goToNextPage () {
    let page = this.state.page
    page++

    if (
      this.state.cars.length === 0 ||
      this.state.cars.length < 10) {
      console.log(this.state.cars.length)
      return
    }

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    CarActions.all(page)
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
      <div className='cars-outer'>
        <h2>All users </h2>
        <h2>All cars </h2>
        {cars}
        <div className='paging-buttons'>
          <button onClick={this.goToPrevPage.bind(this)} disabled={this.state.disabledPrev}>Prev</button>
          <button onClick={this.goToNextPage.bind(this)} disabled={this.state.disabledNext}>Next</button>
        </div>
      </div>
    )
  }
}

export default CarsAllComponent