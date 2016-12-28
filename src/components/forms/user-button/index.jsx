import React from 'react'
import ReactDOM from 'react-dom';


class UserButton extends React.Component {  

  componentDidMount () {
  	//ReactDOM.render(<BookSidebar isLoggedIn={this.props.isLoggedIn}  />, document.getElementById('sidebar'))
     $(".show-sidebar").sideNav();
  }
  
  render() {
  	 
  	  
      return (
      	<a href="#" className="show-sidebar" data-activates="slide-out">{this.props.textValue}</a> 
      )
  }
}

export default UserButton