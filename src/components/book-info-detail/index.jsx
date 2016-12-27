import React from 'react'  



class BookInfoDetail extends React.Component {
  
  render() {
    
    return(
          <div>{this.props.info.description}</div>
        )
      }
    }

export default BookInfoDetail  