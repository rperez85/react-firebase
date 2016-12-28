import React from 'react'  
import firebase from 'firebase';

/*const divStyle = {
  transform: 'translateX(-100%)'
};*/

class BookSidebar extends React.Component {  
  render() {
	//const isLoggedIn = firebase.auth().currentUser;

    return (
    	 <ul id="slide-out" className="side-nav" /*style={divStyle}*/>
		    <li><div className="userView">
		      <div className="background">
		        <img src="images/office.jpg" />
		      </div>
		      <a href="#!user"><img className="circle" src="images/yuna.jpg" /></a>
		      <a href="#!name"><span className="white-text name">John Doe</span></a>
		      <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
		    </div></li>
		    

		     {this.props.isLoggedIn ? (
                  //<LogoutButton onClick={this.handleLogoutClick} />
                  <li>reg</li>
                ) : (
                 //<LoginButton onClick={this.handleLoginClick} />
                  <li>no reg</li>
                )}

		    <li><div className="divider"></div></li>
		    <li><a className="subheader">Subheader</a></li>
		    <li><a className="waves-effect" href="#!">Third link With Waves</a></li>
		  </ul>
		  
    	)
  }
}


export default BookSidebar;

