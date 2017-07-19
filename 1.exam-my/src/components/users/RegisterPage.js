import React from 'react'
import toastr from 'toastr'
import ValidateHelpers from '../common/ValidateHelpers'
import FormHelpers from '../common/forms/FormHelpers'
import RegisterForm from './RegisterForm'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'


class RegisterPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {    
        email: 'test@abv.bg',
        password: '123456',
        confirmPassword: '123456',
        name: 'Test'
      },
      error: ''
    }

    this.handleUserRegistration = this.handleUserRegistration.bind(this)

    UserStore.on(
      UserStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  componentWillUnmount () {
    UserStore.removeListener(
      UserStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration
    )
  }

  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleUserForm (event) {
    event.preventDefault()

    if (!this.validateUser()) {
      return
    }

    UserActions.register(this.state.user)
  }

  handleUserRegistration (data) {
    if (!data.success) {
      let firstError = data.message
      if (data.errors) {
        firstError = Object
          .keys(data.errors)
          .map(k => data.errors[k])[0]
      }

      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push('/users/login')
    }
  }

 validateUser () {
    const user = this.state.user
    return ValidateHelpers.validateRegisterUser.bind(this)((user))
  }

  render () {
    return (
      <div>
        <h1>Register User</h1>
        <RegisterForm
          user={this.state.user}
          error={this.state.error}
          onChange={this.handleUserChange.bind(this)}
          onSave={this.handleUserForm.bind(this)} />
      </div>
    )
  }
}

export default RegisterPage
