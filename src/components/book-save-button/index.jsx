import React from 'react'
import firebase from 'firebase';
import { createStore } from 'redux';
import { store } from '../../actions'


function writeBookData(userId, bookInfo) {
  firebase.database().ref('users/' + userId + '/' + bookInfo.id).set({
      'id': bookInfo.id,
      'title': bookInfo.title,
      'description': bookInfo.description || '',
      'thumbnail': bookInfo.thumbnail || '',
      'tag': 'leidos'
    });
}


class BookSaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      savedBooksIds: []
    }
  }

  componentWillMount () {
    const self = this;

    let setUserState = function() {      
      self.setState({
      	books: store.getState().books,
        savedBooksIds: self.getSavedBooksIds(store.getState().books)
      })
    }

    store.subscribe(() =>    
      setUserState()
    )

    setUserState()
   }
 
   getSavedBooksIds (userBooks) {
      let booksSavedId = [];

      for (var i = 0; i < userBooks.length; i++) {
        booksSavedId.push(userBooks[i].id)
      }

      return booksSavedId;
   }

	handleClickOnSaveBook(userId, bookInfo, e) {
    	writeBookData(userId, bookInfo, e);
  	}

	render() {
		const currentUser = firebase.auth().currentUser;
		const userSavedBooksIds = this.state.savedBooksIds;
		const saved = userSavedBooksIds.indexOf(this.props.bookInfo.id) !== -1;

		let saveButton = null;  

	    if(store.getState().isLogginIn) {
	      if (saved) {
	        saveButton = <a className="btn disabled">guardado</a>;
	      } else {
	        saveButton = <a onClick={() => this.handleClickOnSaveBook(currentUser.uid, this.props.bookInfo)}>guardar</a>;
	      }
	    }

		return saveButton;
		
	}
}


export default BookSaveButton;
