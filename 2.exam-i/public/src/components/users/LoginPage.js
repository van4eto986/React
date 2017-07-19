import React from 'react'
import Auth from './Auth'
import LoginForm from './LoginForm'
import FormHelpers from '../common/forms/FormHelpers'
import ValidateHelpers from '../common/ValidateHelpers'
import UserActions from '../../actions/UserActions'
import UserStore from '../../stores/UserStore'
import toastr from 'toastr'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = { 
      user: {
        email: 'test@abv.bg',
        password: '123456'
      },
      error: ''
    }

    this.handleUserLogin = this.handleUserLogin.bind(this)

    UserStore.on(
      UserStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin)
  }

  componentWillUnmount () {
    UserStore.removeListener(
      UserStore.eventTypes.USER_LOGGED_IN,
      this.handleUserLogin)
  }

  handleUserChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleUserForm (event) {
    event.preventDefault()

     if (!this.validateUser()) {
      return
    }

    UserActions.login(this.state.user)
  }
    validateUser () {
    let user = this.state.user
    return ValidateHelpers.validateLoginUser.bind(this)(user)
  }

  handleUserLogin (data) {
    if (!data.success) {
      this.setState({error: data.message})
    } else {
      Auth.authenticateUser(data.token)
      Auth.saveUser(data.user)
      toastr.success(data.message)
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <h1>Login into your Account</h1>
        <LoginForm
          user={this.state.user}
          error={this.state.error}
          onChange={this.handleUserChange.bind(this)}
          onSave={this.handleUserForm.bind(this)} />
      </div>
    )
  }
}

export default LoginPage
