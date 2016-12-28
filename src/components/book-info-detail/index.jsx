import React from 'react'  



class BookInfoDetail extends React.Component {
  
  render() {
    
    return(
	    	<div className="row">

		      <div className="col s3">
		       		
		      </div>

		      <div className="col s9">
		        <ul>
		        	<li>{this.props.info.description}</li>
		        </ul>
		      </div>

		    </div>
          
        )
      }
    }

export default BookInfoDetail  