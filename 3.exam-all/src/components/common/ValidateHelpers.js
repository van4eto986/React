class ValidateHelpers {
  static validateRegisterUser (user) {
    let error = ''
    let formIsValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      formIsValid = false
    }
    if (user.password.length < 4 || user.confirmPassword.length < 4) {
      error = 'Password and confirm password must have at least 4 characters.'
      formIsValid = false
    }
    if (user.password !== user.confirmPassword) {
      error = 'Password or confirm password do not match.'
      formIsValid = false
    }

    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
  static validateLoginUser (user) {
    let error = ''
    let formIsValid = true
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(user.email)) {
      error = 'You entered invalid e-mail address.'
      formIsValid = false
    }
    if (user.password.length < 4) {
      error = 'Password must have at least 4 characters.'
      formIsValid = false
    }
    if (error) {
      this.setState({error})
    }
    return formIsValid
  }
 }

export default ValidateHelpers
