import React from 'react'

class BookDescription extends React.Component {  
  render() {
  	  const text = this.props.value ? this.props.value.substring(0, this.props.limit) + '...' : '';

      return (
      	<p>{text}</p>
      )
  }
}

export default BookDescription
