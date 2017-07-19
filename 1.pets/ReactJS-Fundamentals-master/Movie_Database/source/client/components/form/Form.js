import React from 'react'

export default class Form extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-defaults'>
              <div className='panel-heading'>
                {this.props.title}
              </div>
              <div className='panel-body'>
                <form onSubmit={this.props.handleSubmit}>
                  <div className={`form-group ${this.props.submitState}`}>
                    <span className='help-block'>
                      {this.props.message}
                    </span>
                  </div>
                  {this.props.children}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
