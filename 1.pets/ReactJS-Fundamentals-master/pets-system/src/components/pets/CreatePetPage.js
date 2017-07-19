import React from 'react'
import CreatePetForm from './CreatePetForm'
import FormHelpers from '../common/forms/FormHelpers'
import PetActions from '../../actions/PetActions'
import PetStore from '../../stores/PetStore'
import toastr from 'toastr'

class CreatePetPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pet: {
        name: 'Fluffy',
        age: 2,
        type: 'Cat',
        image: 'http://www.findupet.com/uploads/petgalleryfile/images/275x205/20160929_160730.jpg',
        breed: 'European shortfur'
      },
      error: ''
    }

    this.handlePetCreation = this.handlePetCreation.bind(this)

    PetStore.on(
      PetStore.eventTypes.PET_CREATED,
      this.handlePetCreation
    )
  }

  handlePetChange (e) {
    FormHelpers.handleFormChange.bind(this)(e, 'pet')
  }

  handlePetForm (e) {
    e.preventDefault()

    //  validate form data

    PetActions.create(this.state.pet)
  }

  handlePetCreation (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)

      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push(`/pets/details/${data.pet.id}`)
    }
  }

  componentWillUnmount () {
    PetStore.removeListener(
      PetStore.eventTypes.PET_CREATED,
      this.handlePetCreation
    )
  }

  render () {
    return (
      <div>
        <h1>Add your pet</h1>
        <CreatePetForm
          pet={this.state.pet}
          error={this.state.error}
          onChange={this.handlePetChange.bind(this)}
          onSave={this.handlePetForm.bind(this)} />
      </div>
    )
  }
}

export default CreatePetPage
