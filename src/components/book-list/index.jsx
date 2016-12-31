import React from 'react'  
import BookRow from '../book-row'
import { createStore } from 'redux';
import { store } from '../../actions'


function thumbnail (thumb) {
  return thumb ? thumb.smallThumbnail : '#';
}

class BookList extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props)

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

  render() {
    const userSavedBooksIds = this.state.savedBooksIds;

    return (    
      <ul>
        {
          this.props.listado.map((book) => {      
            return <BookRow key={ book.key }
                               id={book.id}
                               title={ book.volumeInfo.title }
                               publishedDate={ book.volumeInfo.publishedDate }
                               description={ book.volumeInfo.description } 
                               thumbnail={thumbnail(book.volumeInfo.imageLinks)}
                               authors={book.volumeInfo.authors}
                               publisher={book.volumeInfo.publisher} 
                               saved= {userSavedBooksIds.indexOf(book.id) !== -1}  />
          })
        }
      </ul>
    )
  }
}

export default BookList  