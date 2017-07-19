import React from 'react'

export default class MoviePoster extends React.Component {
  render () {
    let poster = null

    if (this.props.posterUrl) {
      poster = (
        <div className='pull-left thumb-lg'>
          <img className='media-object' src={this.props.posterUrl} />
        </div>
      )
    }

    return poster
  }
}
