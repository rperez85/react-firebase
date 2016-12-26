import React from 'react'  
import EmpleadoAvatar from '../empleado-avatar'
import {browserHistory} from 'react-router';


class BookInfo extends React.Component {
  
  render() {
    
    return(
          <div>{this.props.info.description}</div>
        )
      }
    }

export default BookInfo  