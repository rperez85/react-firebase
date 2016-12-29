import React from 'react'  
import firebase from 'firebase';


function showError(root, errorMessage) {
	  $('#warningText').remove();

	  if (!$('#warningText').length) {
	  	$('#loginPassword').parent().append('<p id="warningText" class="red-text">' + errorMessage + '</p>');
	  } else {
	  	$('#warningText').text(errorMessage);
	  }
}


class BookSidebar extends React.Component {  
  
  handleLogoutClick () {
	firebase.auth().signOut().then(function() {
  // Sign-out successful.
	}, function(error) {
  // An error happened.
	});
  }

  handleLoginClick () {
  	const loginEmail = $('#loginEmail').val();
  	const loginPassword = $('#loginPassword').val();

	firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      showError($('#loginPassword').parent(), errorMessage);
     
    });
  }

  handleShowRegisterClick () {
  	$('#loginContainer').slideUp();
  	$('#registrationContainer').show();
  }

  handleRegisterClick () {
  	const registrationEmail = $('#registrationEmail').val();
  	const registrationPassword = $('#registrationPassword').val();
  	const registrationUser = $('#registrationUser').val();

  	firebase.auth().createUserWithEmailAndPassword(registrationEmail, registrationPassword).then(function(user) {
	    //var user = firebase.auth().currentUser;
	    //logUser(user); // Optional
	    user.updateProfile({
	    	displayName: registrationUser
	    }).then(function() {
	        // Update successful.
	    }, function(error) {
	        // An error happened.
	    });

	}, function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    showError($('#registrationUser').parent(), errorMessage);
	});	
	
  }

  render() {
	//const isLoggedIn = firebase.auth().currentUser;
	

    return (
    	 <div id="slide-out" className="side-nav" /*style={divStyle}*/>
		    
		     {this.props.isLoggedIn ? (
		     	<div>
		     		<p className="subheader">{this.props.userName.displayName}</p>
		     	  	<p className="divider"></p>
		     	  	<p className="subheader">{this.props.userName.email}</p>
		     	  	<a onClick={() => this.handleLogoutClick()}>deslogar</a>
		     	  	<a>modificar datos</a>
                  <ul>
			        {
			          this.props.userBooks.map((book) => {
			          	
			          	return <li key={ book.key }>{book.title}</li>
			         
			          })
			        }
			      </ul>
			      
			     </div>
                ) : (
                 //<LoginButton onClick={this.handleLoginClick} />
                 <div>
              		<div id="loginContainer">
              			<div className="row">
						    <form className="col s12">
						        <div className="col s12">
						          <input id="loginEmail" type="email" className="validate" placeholder="email" />
						     	</div>
						        <div className="col s12">
						          <input id="loginPassword" type="password" className="validate" placeholder="contraseña" />    
						        </div>
								<a className="waves-effect waves-light btn col s12" onClick={() => this.handleLoginClick()}>iniciar sesión</a>
								<div className="col s12">
									<a onClick={() => this.handleShowRegisterClick()}>¿no estas registrado/a?</a>
								</div>		      							     
						    </form> 
						</div>
					</div>
					<div>
						<div id="registrationContainer" style={{
						  display: 'none'
						}}>
							<div className="row">
							    <form className="col s12">
							        <div className="col s12">
							          <input id="registrationEmail" type="email" className="validate" placeholder="email" />
							     	</div>
							        <div className="col s12">
							          <input id="registrationPassword" type="password" className="validate" placeholder="contraseña" />    
							        </div>
							        <div className="col s12">
							          <input id="registrationUser" type="text" className="validate" placeholder="usuario" />    
							        </div>
									<a className="waves-effect waves-light btn col s12" onClick={() => this.handleRegisterClick()}>Registrate</a>
	      							     
							    </form> 
							</div>
						</div>
                  	</div>
                  </div>

                )}

	
		  </div>
		  
    	)
  }
}


export default BookSidebar;

