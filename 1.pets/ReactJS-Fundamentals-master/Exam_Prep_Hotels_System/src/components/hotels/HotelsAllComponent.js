import React from 'react'
import {Link} from 'react-router-dom'
import queryString from 'querystring'

import HotelActions from '../../actions/HotelActions'
import HotelStore from '../../stores/HotelStore'

class HotelsAllComponent extends React.Component {
  constructor (props) {
    super (props)

    const query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1

    this.state = {
      hotels: [],
      page: page,
      disabledPrev: true,
      disabledNext: false
    }

    this.handleHotelsData = this.handleHotelsData.bind(this)

    HotelStore.on(
      HotelStore.eventTypes.ALL_HOTELS_SERVED,
      this.handleHotelsData
    )
  }

  componentDidMount () {
    HotelActions.all(this.state.page)
  }

  componentWillUnmount () {
    HotelStore.removeListener(
      HotelStore.eventTypes.ALL_HOTELS_SERVED,
      this.handleHotelsData
    )
  }

  handleHotelsData (data) {
    this.setState({hotels: data})

    if (this.state.hotels.length < 1 || this.state.page < 2) {
      this.setState({
        disabledPrev: true,
        disabledNext: false
      })
    }

    else if (
      this.state.hotels.length === 0 ||
      this.state.hotels.length < 10) {
      this.setState({
        disabledPrev: false,
        disabledNext: true
      })
    }
  }

  goToPrevPage () {
    if (this.state.hotels.length < 1 || this.state.page < 2) {
      return
    }

    let page = this.state.page
    page--

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    HotelActions.all(page)
  }

  goToNextPage () {
    let page = this.state.page
    page++

    if (
      this.state.hotels.length === 0 ||
      this.state.hotels.length < 10) {
      console.log(this.state.hotels.length)
      return
    }

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    HotelActions.all(page)
  }

  render () {
    let hotels = 'No hotels available'

    if (this.state.hotels.length > 0) {
      hotels = this.state.hotels.map((hotel) => (
        <div key={hotel.id} className='hotel-card-container'>
          <img src={hotel.image} alt='pet' />
          <p>Name: {hotel.name}</p>
          <p>Location: {hotel.location}</p>
          <Link to={`/hotels/details/${hotel.id}`}>See more details</Link>
        </div>
      ))
    }

    return (
      <div className='hotels-outer'>
        <h2>All hotels List</h2>
        {hotels}
        <div className='paging-buttons'>
          <button onClick={this.goToPrevPage.bind(this)} disabled={this.state.disabledPrev}>Prev</button>
          <button onClick={this.goToNextPage.bind(this)} disabled={this.state.disabledNext}>Next</button>
        </div>
      </div>
    )
  }
}

export default HotelsAllComponent
