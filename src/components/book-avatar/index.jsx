import React from 'react'

class BookAvatar extends React.Component {  
  render() {
      return (
      <figure className="col s1">
        <img className="media-object img-thumbnail"  width="100px" src={`${this.props.thumbnail}`} />
      </figure>
    )
  }
}

export default BookAvatar