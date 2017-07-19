import React from 'react'
import queryString from 'query-string'
import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import {Link} from 'react-router-dom'

class ListCarsPage extends React.Component {
  constructor (props) {
    super(props)

    let query = queryString.parse(props.location.search)
    let page = Number(query.page) || 1
    this.state = {
      cars: [],
      page: page
    }

    this.handleCarsFetching = this.handleCarsFetching.bind(this)
    CarStore.on(CarStore.eventTypes.CARS_FETCHED, this.handleCarsFetching)
  }

  componentDidMount () {
    CarActions.all(this.state.page)
  }

  componentWillUnmount () {
    CarStore.removeListener(CarStore.eventTypes.CARS_FETCHED, this.handleCarsFetching)
  }

  handleCarsFetching (data) {
    this.setState({
      cars: data
    })
  }

  goToNextPage () {
    if (this.state.cars.length < 10) {
      return
    }

    let page = this.state.page
    page++

    this.setState({
      page
    })

    this.props.history.push(`/?page=${page}`)
    CarActions.all(page)
  }

  goToPrevPage () {
    if (this.state.page === 1) {
      return
    }

    let page = this.state.page
    page--

    this.setState({
      page
    })

    this.props.history.push(`/?page=${page}`)
    CarActions.all(page)
  }
  render () {
    const cars = this.state.cars.map(car => (
      <div key={car.id} className='car'>
        <img src={car.image} alt='car' />
        <Link to={`/cars/details/${car.id}`}>{car.make}({car.model})</Link>
      </div>
    ))
    return (
      <div>
        <h1>All cars</h1>
        {cars}
        <div>
          <button onClick={this.goToPrevPage.bind(this)}>Prev</button>
          <button onClick={this.goToNextPage.bind(this)}>Next</button>
        </div>
      </div>
    )
  }
}

export default ListCarsPage