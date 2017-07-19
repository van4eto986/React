import React from 'react'

import UserStore from '../stores/UserStore'

import Navbar from './Navbar'
import Footer from './Footer'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = UserStore.getState()

    this.onChange = this.onChange.bind(this)
  }

  onChange (state) {
    this.setState(state)
  }

  componentDidMount () {
    UserStore.listen(this.onChange)
  }

  componentWillUnmount () {
    UserStore.unlisten(this.onChange)
  }

  logoutUser () {
    let request = {
      url: '/user/logout',
      method: 'post'
    }

    $.ajax(request)
      .done(() => {
        this.setState({
          loggedInUserId: ''
        })
      })
      .fail((err) => {
        this.setState({
          error: err.responseJSON.message
        })
      })
  }

  render () {
    // console.log('App.js')
    // console.log(this.props.children)
    // console.log('App.js')

    return (
      <div>
        <Navbar />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}
