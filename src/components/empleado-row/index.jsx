import React from 'react'  
import EmpleadoAvatar from '../empleado-avatar'
import {browserHistory} from 'react-router';


function Description(props) {
  const text = props.value ? props.value.substring(0, props.limit) + '...' : '';
  return (
    <p>{text}</p>
  );
}



class EmpleadoRow extends React.Component {
  
  handleClickShowComplete (id, e) {
    console.log(id)
    browserHistory.push('/libro/' + id);
    e.preventDefault();
  }


  render() {
    
    return(
          <li className="media">
            <EmpleadoAvatar thumbnail={this.props.thumbnail} />
            <div className="media-body">
              <h4 className="no-margin_bottom">{this.props.title}</h4>
              <p>
                <span className="label label-info">{this.props.authors ? 'autor: ' + this.props.authors.join(', ') : ''}</span>
                <span className="label label-info">año: {this.props.publishedDate}</span>
                <span className="label label-info">editorial: {this.props.publisher}</span>
              </p>
              <Description value={this.props.description} limit="120" />
              <a href="#" onClick={() => this.handleClickShowComplete(this.props.id, event)}>Ver ficha completa</a>
            
            </div>
            <hr/>
          </li>
        )
      }
    }

export default EmpleadoRow  