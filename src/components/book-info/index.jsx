import React from 'react'  
import ReactDOM from 'react-dom';
import BookLInfoDetail from '../../components/book-info-detail'


class BookInfo extends React.Component {  
  constructor(props) {
    super(props);
    this.handleClickShowComplete();
  }
  
  handleClickShowComplete () { 
    $.getJSON("https://www.googleapis.com/books/v1/volumes/" + this.props.params.id, function(data){
      let bookData = data;
      ReactDOM.render(<BookLInfoDetail info={ bookData } />, document.getElementById('application'))     
    });
    
  }
  render() {   
    return (<div>
        <div id="application"></div>
      </div>
    )
  }
}


export default BookInfo;

