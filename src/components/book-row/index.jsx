import React from 'react'  
import BookAvatar from '../book-avatar'
import {browserHistory} from 'react-router';
import { createStore } from 'redux';

//helper
function Description(props) {
  const text = props.value ? props.value.substring(0, props.limit) + '...' : '';
  return (
    <p>{text}</p>
  );
}



class BookRow extends React.Component {
  
  constructor(props) {
    super(props);
    //console.log(props)

    this.state = {
      isLoggedIn: false,
      user: null,
      books: []
    }

  }

   componentWillMount () {
    var self = this;
    store.subscribe(() =>
    
      self.setState({
        isLoggedIn: store.getState().isLogginIn,
        user: store.getState().user
      })

    )
   }


  handleClickShowComplete (id, e) {
    browserHistory.push('/libro/' + id);
    e.preventDefault();
  }


  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const userName = this.state.user;
    const userBooks = this.state.books;

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
              {isLoggedIn ? (
                  //<LogoutButton onClick={this.handleLogoutClick} />
                  <a>guardar</a>
                ) : (
                 //<LoginButton onClick={this.handleLoginClick} />
                 <a></a>
                )}

              
            </div>
           
          </li>


        )
      }
    }

export default BookRow  