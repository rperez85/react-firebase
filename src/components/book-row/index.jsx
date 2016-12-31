import React from 'react'  
import BookAvatar from '../book-avatar'
import {browserHistory} from 'react-router';
import { createStore } from 'redux';
import firebase from 'firebase';
import { store } from '../../actions'



//helper
function Description(props) {
  const text = props.value ? props.value.substring(0, props.limit) + '...' : '';
  return (
    <p>{text}</p>
  );
}

function writeBookData(userId, bookInfo) {
  firebase.database().ref('users/' + userId + '/' + bookInfo.id).set({
      'id': bookInfo.id,
      'title': bookInfo.title,
      'description': bookInfo.description || '',
      'tag': 'leidos'
    });
}


class BookRow extends React.Component {
  
  handleClickShowComplete (id, e) {
    browserHistory.push('/libro/' + id);
    e.preventDefault();
  }

  handleClickOnSaveBook(userId, bookInfo, e) {
    writeBookData(userId, bookInfo, e);
  }


  render() {
    const currentUser = firebase.auth().currentUser;
    let saveButton = null;  

    if(store.getState().isLogginIn) {
      if (this.props.saved) {
        saveButton = <a className="btn disabled">guardado</a>;
      } else {
        saveButton = <a onClick={() => this.handleClickOnSaveBook(currentUser.uid, {'id': this.props.id, 'title': this.props.title, 'description': this.props.description }, event)}>guardar</a>;
      }
    }

    return(
          <li className="row card">
            <BookAvatar thumbnail={this.props.thumbnail} />
            <div className="col s10">
              <h5>{this.props.title}</h5>
              <div className="row">
                <span className="badge left">{this.props.authors ? 'autor: ' + this.props.authors.join(', ') : ''}</span>
                <span className="badge left">año: {this.props.publishedDate}</span>
                <span className="badge left">editorial: {this.props.publisher}</span>
              </div>
              <Description value={this.props.description} limit="200" />
              <a onClick={() => this.handleClickShowComplete(this.props.id, event)}>Ver ficha completa</a>
              {saveButton}
            </div>
           
          </li>


        )
      }
    }

export default BookRow  