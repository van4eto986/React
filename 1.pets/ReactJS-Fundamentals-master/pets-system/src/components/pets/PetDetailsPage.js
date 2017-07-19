import React from 'react'
import toastr from 'toastr'

import PetActions from '../../actions/PetActions'
import PetStore from '../../stores/PetStore'

import Input from '../common/forms/Input'
import FormHelpers from '../common/forms/FormHelpers'
import ListAllComments from './ListAllComments'

class PetDetailsPage extends React.Component {
  constructor (props) {
    super(props)

    let petId = this.props.match.params.id

    this.handlePetDetails = this.handlePetDetails.bind(this)
    this.handleCommentsUpdate = this.handleCommentsUpdate.bind(this)

    PetStore.on(  //  attach listener to call when PetStore emits
      PetStore.eventTypes.PET_DETAILS_SERVED,
      this.handlePetDetails
    )

    PetStore.on(
      PetStore.eventTypes.PET_COMMENT_ADDED,
      this.handleCommentsUpdate
    )

    this.state = {
      pet: {},
      petId: petId,
      newComment: ''
    }
  }

  componentDidMount () {
    PetActions.details(this.state.petId)
  }

  componentWillUnmount () {
    PetStore.removeListener(
      PetStore.eventTypes.PET_DETAILS_SERVED,
      this.handlePetDetails
    )

    PetStore.removeListener(
      PetStore.eventTypes.PET_COMMENT_ADDED,
      this.handleCommentsUpdate
    )
  }

  handlePetDetails (data) {
    this.setState({pet: data})
  }

  handleCommentChange (e) {
    FormHelpers.handleCommentChange.bind(this)(e, 'newComment')
  }

  handleCommentSubmit (e) {
    e.preventDefault()

    // validate

    PetActions.comment(this.state.petId, this.state.newComment)

    this.setState({newComment: ''})
  }

  handleCommentsUpdate (data) {
    if (!data.success) {
      toastr.error(data.message)
    } else {
      toastr.success(data.message)
      PetActions.commentsAll(data.comment.id)
    }
  }

  render () {
    let pet = this.state.pet

    return (
      <div>
        <h1>Pet details page</h1>
        <div key={this.state.petId} className='pet-details-container'>
          <img src={pet.image} alt='pet' />
          <p>Name: {pet.name}</p>
          <p>Age: {pet.age} years</p>
          <p>Type: {pet.type}</p>
          <p>Breed: {pet.breed}</p>
          <div>
            <Input
              name='newComment'
              type='text'
              placeholder='Comment'
              value={this.state.newComment}
              onChange={this.handleCommentChange.bind(this)} />
            <input type='submit' onClick={this.handleCommentSubmit.bind(this)} value='Send Comment' />
          </div>
        </div>

        <ListAllComments petId={this.state.petId} />

      </div>

    )
  }
}

export default PetDetailsPage
