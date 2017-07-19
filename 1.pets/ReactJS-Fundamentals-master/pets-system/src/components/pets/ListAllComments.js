import React from 'react'

import PetActions from '../../actions/PetActions'
import PetStore from '../../stores/PetStore'

class ListAllComments extends React.Component {
  constructor (props) {
    super(props)

    this.handleComments = this.handleComments.bind(this)

    PetStore.on(
      PetStore.eventTypes.PET_COMMENTS_ALL_SERVED,
      this.handleComments
    )

    this.state = {
      petId: '',
      comments: []
    }
  }

  componentDidMount () {
    this.setState({petId: this.props.petId})
    PetActions.commentsAll(this.props.petId)
  }

  componentWillUnmount () {
    PetStore.removeListener(
      PetStore.eventTypes.PET_COMMENTS_ALL_SERVED,
      this.handleComments
    )
  }

  handleComments (data) {
    this.setState({comments: data})
  }

  render () {
    let comments = 'No comments for this Pet'

    if (this.state.comments.length > 0) {
      comments = this.state.comments.map((c, index) => (
        <div key={index} className='comment'>
          <p>Message: {c.message}</p>
          <p>From: {c.user}</p>
        </div>
      ))
    }

    return (
      <div>
        <h2>Comments: {this.state.comments.length ? this.state.comments.length : 0}</h2>
        <div className='comments-wrapper'>
          {comments}
        </div>
      </div>
    )
  }
}

export default ListAllComments
