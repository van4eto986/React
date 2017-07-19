import React from 'react'
import CreateCarForm from './CreateCarForm'
import FormHelpers from '../common/FormHelpers'
import CarActions from '../../actions/CarActions'
import CarStore from '../../stores/CarStore'
import toastr from 'toastr'

class CreateCarPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      car: {
        make: 'Merc',
        model: 'c220',
        year: 2000,
        engine: 'ere',
        price: 10000,
        image: 'http://cdn2.autoexpress.co.uk/sites/autoexpressuk/files/styles/article_main_image/public/7/03//12_3.jpg?itok=fzMkS-iE',
        mileage: 100000
      },
      error: ''
    }

    this.handleCarCreation = this.handleCarCreation.bind(this)
    CarStore.on(CarStore.eventTypes.CAR_CREATED, this.handleCarCreation)
  }

  componentWillUnmount () {
    CarStore.removeListener(CarStore.eventTypes.CAR_CREATED, this.handleCarCreation)
  }

  handleCarChange (ev) {
    FormHelpers.handleFormChange.bind(this)(ev, 'car')
  }

  handleCarForm (ev) {
    ev.preventDefault()
    CarActions.create(this.state.car)
  }

  handleCarCreation (data) {
    if (!data.success) {
      let firstError = data.message

      if (data.errors) {
        firstError = Object.keys(data.errors).map(k => data.errors[k])[0]
      }

      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push(`/cars/details/${data.car.id}`)
    }
  }

  render () {
    return (
      <div>
        <h1>Create car</h1>
        <CreateCarForm
          car={this.state.car}
          error={this.state.error}
          onChange={this.handleCarChange.bind(this)}
          onSave={this.handleCarForm.bind(this)} />
      </div>
    )
  }
}

export default CreateCarPage