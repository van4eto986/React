import React from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import PetActions from '../../actions/PetActions'
import PetStore from '../../stores/PetStore'
import petsSeed from '../../data/petsSeed'

class ListPetsPage extends React.Component {
  constructor (props) {
    super(props)

    let query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1

    this.state = {
      pets: [],
      page: page
    }

    this.handlePetsFetch = this.handlePetsFetch.bind(this)
    this.handlePetsSeed = this.handlePetsSeed.bind(this)

    PetStore.on(  //  attach listener to call when PetStore emits
      PetStore.eventTypes.PETS_FETCHED,
      this.handlePetsFetch
    )

    PetStore.on(
      PetStore.eventTypes.PET_SEEDED,
      this.handlePetsSeed
    )
  }

  componentDidMount () {
    PetActions.all(this.state.page)
  }

  componentWillUnmount () {
    PetStore.removeListener(
      PetStore.eventTypes.PETS_FETCHED,
      this.handlePetsFetch
    )

    PetStore.removeListener(
      PetStore.eventTypes.PET_SEEDED,
      this.handlePetsSeed
    )
  }

  handlePetsFetch (data) {
    this.setState({
      pets: data
    })
  }

  goToPrevPage () {
    if (this.state.pets.length < 1 || this.state.page < 2) {
      return
    }

    let page = this.state.page
    page--

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    PetActions.all(page)
  }

  goToNextPage () {
    let page = this.state.page
    page++

    if (
      this.state.pets.length === 0 ||
      this.state.pets.length < 10) {
      return
    }

    this.setState({page})

    this.props.history.push(`/?page=${page}`)

    PetActions.all(page)
  }

  seedPets () {
    PetActions.seedPets(petsSeed)
  }

  handlePetsSeed (data) {
    PetActions.all(this.state.page)
  }

  render () {
    let pets = 'No pets available'

    if (this.state.pets.length > 0) {
      pets = this.state.pets.map((pet) => (
        <div key={pet.id} className='pet-card-container'>
          <img src={pet.image} alt='pet' />
          <p>Name: {pet.name}</p>
          <p>Type: {pet.type}</p>
          <Link to={`/pets/details/${pet.id}`}>See more details</Link>
        </div>
      ))
    }

    if (Array.isArray(pets)) {
      return (
        <div className='pets-outer'>
          <h1>All Pets</h1>
          {pets}
          <div className='paging-buttons'>
            <button onClick={this.goToPrevPage.bind(this)}>Prev</button>
            <button onClick={this.goToNextPage.bind(this)}>Next</button>
          </div>
        </div>
      )
    } else {
      return (
        <h1>
          {pets} =>&nbsp;&nbsp;&nbsp;
          <button className='seed-btn' onClick={this.seedPets.bind(this)}>seed pets data</button>
          <small>&nbsp;&nbsp;you have to register and login first</small>
        </h1>
      )
    }
  }
}

export default ListPetsPage
