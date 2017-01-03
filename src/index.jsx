import React from 'react'  
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import BookMain from './components/book-main'
import BookInfo from './components/book-info'
//import BookDestacados from './components/book-destacados'
import UserButton from './components/forms/user-button'
import BookSidebar from './components/book-sidebar'
import { store } from './actions'

//firebase bbdd
const config = {
  apiKey: "AIzaSyBwaQQH3lmGJtJgHkPQp7W8z5Z4MpMT71w",
  authDomain: "react-books.firebaseapp.com",
  databaseURL: "https://react-books.firebaseio.com",
  storageBucket: "react-books.appspot.com",
  messagingSenderId: "734841775209"
};


firebase.initializeApp(config);

//initialize App
class App extends React.Component {  
  constructor() {
    super()

    this.state = {
      isLoggedIn: false,
      user: null,
      books: []
    }
  }

  componentDidUpdate() {
    store.dispatch({type: 'SET_STATE', values: {'isLogginIn': this.state.isLoggedIn, 'user': this.state.user, 'books': this.state.books}})
  }

  componentWillMount () {
    const self = this;

    //guardar libro
    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
          self.setState({
            isLoggedIn: true,
            user: user
          })
          
          store.dispatch({type: 'SET_STATE', values: {'isLogginIn': true, 'user': user}})
          
          //recuperar libros segun usuario
          const bookRef = firebase.database().ref('users/' + user.uid);
          
          bookRef.on('value', function(snapshot) {
            let arrBook = [];
            let obj = snapshot.val();
            let cont = 0;

            for (let value in obj) {
              arrBook.push(obj[value]);
              obj[value]['key'] = cont++;
            }

            self.setState({
              books: arrBook
            })
          });

      } else {
        // No user is signed in.
        self.setState({
            isLoggedIn: false,
            user: null
          })

        store.dispatch({type: 'SET_STATE', values: {'isLogginIn': false, 'user': null}})
      }
    }); 
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const userName = this.state.user;
    const userBooks = this.state.books;
    return (
        <div>
          <nav>
            <div className="nav-wrapper container">
              <a href="#" className="brand-logo">Logo</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to="/index">Home</Link></li>
                {isLoggedIn ? (  
                  <li><UserButton isLoggedIn="true" textValue={userName.displayName} /></li>
                ) : (               
                  <li><UserButton isLoggedIn="false" textValue="Inicia sesión" /></li>
                )}    
              </ul>
            </div>
          </nav>
          <div className="container">
            {this.props.children}
          </div>
          <BookSidebar userBooks={userBooks} userName={userName} isLoggedIn={isLoggedIn}  />
        </div>
    )
  }
}

//routers config
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BookMain} />
      <Route path="index" component={BookMain} />
      <Route path="libro/:id" component={BookInfo} />
    </Route>

  </Router>  

), document.getElementById('root'))

