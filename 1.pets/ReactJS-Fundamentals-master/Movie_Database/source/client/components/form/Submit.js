import React from 'react'

export default class Submit extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <input type='submit' className={`btn ${this.props.type}`} value={this.props.value} />
  }
}
