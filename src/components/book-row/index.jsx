import React from 'react'  
import BookAvatar from '../book-avatar'
import BookDescription from '../book-description'
import BookSaveButton from '../book-save-button'
import {browserHistory} from 'react-router';


//helper
/*function Description(props) {
  const text = props.value ? props.value.substring(0, props.limit) + '...' : '';
  return (
    <p>{text}</p>
  );
}*/


class BookRow extends React.Component {
  
  handleClickShowComplete (id, e) {
    browserHistory.push('/libro/' + id);
    e.preventDefault();
  }

  handleClickOnSaveBook(userId, bookInfo, e) {
    writeBookData(userId, bookInfo, e);
  }


  render() {

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
              <BookDescription value={this.props.description} limit="200" />
              <div className="row row-footer">
                <a onClick={() => this.handleClickShowComplete(this.props.id, event)}>Ver ficha</a>
                <BookSaveButton bookInfo={this.props}/>
              </div>
            </div>
           
          </li>


        )
      }
    }

export default BookRow  