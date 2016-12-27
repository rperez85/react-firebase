import React from 'react'

class EmpleadoAvatar extends React.Component {  
  render() {
      return (
      <figure className="media-left">
        <img className="media-object img-thumbnail" width="64px" src={`${this.props.thumbnail}`} />
      </figure>
    )
  }
}

export default EmpleadoAvatar