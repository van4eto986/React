import React from 'react'
import toastr from 'toastr'
import FormHelpers from '../common/forms/FormHelpers'

import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import CarCreateForm from './CarCreateForm'

class CarCreateComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      car: {
        make: '',
        model: '',
        year: '',
        engine: '',
        price: '',
        image: '',
        mileage: ''
        },
      error: ''
    }

    this.handleCreationResponse = this.handleCreationResponse.bind(this)

    CarStore.on(
      CarStore.eventTypes.CREATED_CAR,
      this.handleCreationResponse
    )
  }

  handleCarChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'car')
  }

  handleCarForm (event) {
    event.preventDefault()

    if (
      this.state.car.make.length < 3 ||
      this.state.car.model.length < 3 ||
      this.state.car.year < 1 ||
      this.state.car.year > 2050 ||
      this.state.car.engine.length < 1 ||
      this.state.car.price < 0 ||
      !this.state.car.image
    ) {
      this.setState({
        error: 'Validation error: name must be at least 3 symbols!'
      })
    } else {
      CarActions.create(this.state.car)
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
      this.props.history.push(`/cars/details/${data.car.id}`)
    }
  }

  componentWillUnmount () {
    CarStore.removeListener(
      CarStore.eventTypes.CREATED_CAR,
      this.handleCreationResponse
    )
  }

  render () {
    return (
      <div>
        <h2>Create </h2>
        <CarCreateForm
          error={this.state.error}
          car={this.state.car}
          onChange={this.handleCarChange.bind(this)}
          onSave={this.handleCarForm.bind(this)} />
      </div>
    )
  }
}

export default CarCreateComponent
