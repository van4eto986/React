import React from 'react'
import toastr from 'toastr'
import FormHelpers from '../common/forms/FormHelpers'

import HotelActions from '../../actions/HotelActions'
import HotelStore from '../../stores/HotelStore'

import HotelCreateForm from './HotelCreateForm'

class HotelCreateComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hotel: {
        name: 'Adena',
        location: 'Chermomorec',
        description: 'Ако търсите красиво и спокойно място, Вие вече сте го открили! Хотел Адена се намира в близост до централния плаж и централна градска част на град Черноморец, с красива панорамна гледка и изглед към морето. Елегантният 4 - етажен хотел предлага отлични условия за лятна почивка с достатъчни съоръжения за отдих и развлечения. ',
        numberOfRooms: 20,
        image: 'https://static.pochivka.bg/bgstay.com/images/photos/15/15771/orig_15771_1.jpg',
        parkingSlots: 26
      },
      error: ''
    }

    this.handleCreationResponse = this.handleCreationResponse.bind(this)

    HotelStore.on(
      HotelStore.eventTypes.CREATED_HOTEL,
      this.handleCreationResponse
    )
  }

  handleHotelChange (e) {
    FormHelpers.handleFormChange.bind(this)(e, 'hotel')
  }

  handleHotelForm (e) {
    e.preventDefault()

    if (
      this.state.hotel.name.length < 2 ||
      this.state.hotel.location.length < 1 ||
      !this.state.hotel.description ||
      this.state.hotel.numbersOfRooms < 1 ||
      !this.state.hotel.image
    ) {
      this.setState({
        error: 'Validation error: name must be at least 3 symbols, and all other fields are required (except parking slots)!'
      })
    } else {
      HotelActions.create(this.state.hotel)
    }
  }

  handleCreationResponse (data) {
    if (!data.success) {
      let firstError = FormHelpers.getFirstError(data)

      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push(`/hotels/details/${data.hotel.id}`)
    }
  }

  componentWillUnmount () {
    HotelStore.removeListener(
      HotelStore.eventTypes.CREATED_HOTEL,
      this.handleCreationResponse
    )
  }

  render () {
    return (
      <div>
        <h2>Hotel Create Component</h2>
        <HotelCreateForm
          error={this.state.error}
          hotel={this.state.hotel}
          onChange={this.handleHotelChange.bind(this)}
          onSave={this.handleHotelForm.bind(this)} />
      </div>
    )
  }
}

export default HotelCreateComponent
