import React from 'react'  

class BookInfoDetail extends React.Component {
  
  render() {

    return(
	    	<div className="row">
		      <div className="col s4">
		       	<figure className="col s12">
        			<img className="media-object img-thumbnail"  width="270px" src={`${this.props.info.volumeInfo.imageLinks.medium}`} />
      			</figure>
		      </div>

		      <div className="col s7">
		      	<h5>{this.props.info.volumeInfo.title}</h5>
		      	<strong>{(this.props.info.volumeInfo.authors).join(', ')}</strong>
		        <ul>
		        	<li>{this.props.info.volumeInfo.description}</li>
		        	<li><a target="_blank" href={this.props.info.saleInfo.buyLink}>comprar</a></li>
		        	
		        </ul>
		      </div>

		    </div>
          
        )
      }
    }

export default BookInfoDetail  