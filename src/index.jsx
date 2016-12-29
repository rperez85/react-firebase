import React from 'react'  
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import BookMain from './components/book-main'
import BookInfo from './components/book-info'
import BookDestacados from './components/book-destacados'
import UserButton from './components/forms/user-button'
import BookSidebar from './components/book-sidebar'



function userState(state, action) {
  if (action.type === 'setState') {
    return {
      'isLogginIn': action.values.isLogginIn || false,
      'user': action.values.user || null,
      'books': action.values.books || []
    }
  }
}

window.store = createStore(userState)


//firebase bbdd
const config = {
  apiKey: "AIzaSyBwaQQH3lmGJtJgHkPQp7W8z5Z4MpMT71w",
  authDomain: "react-books.firebaseapp.com",
  databaseURL: "https://react-books.firebaseio.com",
  storageBucket: "react-books.appspot.com",
  messagingSenderId: "734841775209"
};


firebase.initializeApp(config);


function writeNewPost(uid, username, picture, title, body) {
  // A post entry.
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

function writeBookData(userId, bookInfo) {
  firebase.database().ref('users/' + userId + '/' + bookInfo.id).set({
      'title': bookInfo.title,
      'description': bookInfo.description,
      'tag': 'leidos'
    });
}


//initialize App
class App extends React.Component {  
  constructor() {
    super()

    this.state = {
      isLoggedIn: false,
      user: null,
      books: []
    }
    /*firebase.auth().createUserWithEmailAndPassword('rperezdelatorre@gmail.com', 'pruebas1').catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error)
    });*/


   

  }

  componentWillMount () {
    //Materialize.updateTextFields();
    /*firebase.auth().createUserWithEmailAndPassword('rperezdelatorre2@gmail.com', 'pruebas1').catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });*/


    /*firebase.auth().signInWithEmailAndPassword('rperezdelatorre@gmail.com', 'pruebas1').catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      var user = firebase.auth().currentUser;

       console.log(errorCode)


    });*/


    /*firebase.auth().signOut().then(function() {
  // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
    return;*/

    var self= this;

    //guardar libro
    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
          self.setState({
            isLoggedIn: true,
            user: user
          })
          
          store.dispatch({type: 'setState', values: {'isLogginIn': true, 'user': user}})
          //writeNewPost(user.uid, user.displayName,'imagen','titulo','cuerpo')

          const bookInfo = {
            id: '1324',
            title: 'titulo libro3',
            description: 'descripcion'
          }

          writeBookData(user.uid, bookInfo);


          //recuperar libros segun usuario
          var bookRef = firebase.database().ref('users/' + user.uid);
          
          bookRef.on('value', function(snapshot) {
            var arrBook = [];
            var obj = snapshot.val();
            var cont = 0;
            
            for (var value in obj) {
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

        store.dispatch({type: 'setState', values: {'isLogginIn': false}})
      }
    }); 


    //const nameRef = firebase.database().ref().child('username');
    //evento de firebase que se lanza cada vez que cambia un valor en la bbdd
   /* nameRef.on('value', snapshot => {  
      this.setState({
        name: snapshot.val()
      })
     
    })*/

 /* firebase.database().ref().set({
    username: '111'
  });*/

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
                <li><Link to="/destacados">Destacados</Link></li>
                {isLoggedIn ? (
                  //<LogoutButton onClick={this.handleLogoutClick} />
                  <li><UserButton isLoggedIn="true" textValue={userName.displayName} /></li>
                ) : (
                 //<LoginButton onClick={this.handleLoginClick} />
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
      <Route path="destacados" component={BookDestacados} />
      <Route path="libro/:id" component={BookInfo} />
    </Route>

  </Router>  

), document.getElementById('root'))

