import React from 'react'  
import BookRow from '../book-row'
import { createStore } from 'redux';
import { store } from '../../actions'


function thumbnail (thumb) {
  return thumb ? thumb.smallThumbnail : '#';
}

class BookList extends React.Component {
  
  render() {
   
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
                               publisher={book.volumeInfo.publisher}   />
          })
        }
      </ul>
    )
  }
}

export default BookList  