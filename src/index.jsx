import React from 'react'  
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import BookMain from './components/book-main'
import BookInfo from './components/book-info'
import BookDestacados from './components/book-destacados'
import UserButton from './components/forms/user-button'
import BookSidebar from './components/book-sidebar'

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
      user: null
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
    var self= this;

    //guardar libro
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.setState({
            isLoggedIn: true,
            user: user
          })

          user.updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(function() {
            // Update successful.
          }, function(error) {
            // An error happened.
          });

          //console.log(user.uid, user.getToken())

          //writeNewPost(user.uid, user.displayName,'imagen','titulo','cuerpo')

          const bookInfo = {
            id: '1324',
            title: 'titulo libro',
            description: 'descripcion'
          }

          writeBookData(user.uid, bookInfo);

          //recuperar libros segun usuario
          var bookRef = firebase.database().ref('users/' + user.uid);
          bookRef.on('value', function(snapshot) {
            console.log(snapshot.val());
          });

      } else {
        // No user is signed in.
      }
    }); 

  
      
   

    /*firebase.auth().createUserWithEmailAndPassword('rperezdelatorre2@gmail.com', 'pruebas1').catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });*/

/*firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});*/

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
          <BookSidebar isLoggedIn={isLoggedIn}  />
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

