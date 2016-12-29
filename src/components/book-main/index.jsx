import React from 'react'
import ReactDOM from 'react-dom';
import BookList from '../../components/book-list'



const urlApiRest = 'https://www.googleapis.com/books/v1/volumes';


class BookMain extends React.Component {  
  
  constructor(props) {
    super(props);

    this.handleUrlFilter();

    this.params = {
      searchText: '', 
      maxResults: 40,
      filter: 'partial', //full, free-ebooks, paid-ebooks, ebooks
      printType: 'all', //books, magazines
      orderBy: 'relevance' //newest 
    }

    

  }

  //lanza el evnto una vez renderizado el componete
  


  handleRequest (url) {
  	$.getJSON(url, function(data){
		let bookData = data.items;

		for(let i = 0; i < bookData.length; i++) {
			bookData[i]['key'] = i;
		}

		//setUrl
		history.pushState(null, null, url.substring(url.indexOf('?'), url.length))

		ReactDOM.render(<BookList listado={ bookData } />, document.getElementById('application'))  
	});
  }


  handleClick () {
  	this.params.searchText = $('#searchText').val();

  	let urlFilters = [urlApiRest + "?q=" + this.params.searchText];
  	urlFilters.push("&maxResults=" +  this.params.maxResults);
  	urlFilters.push("&filter=" +  this.params.filter);
  	urlFilters.push("&printType=" +  this.params.printType);
  	urlFilters.push("&orderBy=" +  this.params.orderBy);
  	
  	this.handleRequest(urlFilters.join(''));

  }

  handleUrlFilter () {
  	 let params = document.location.search.substr(1);
     //rellenar filtros...

     if (!params) {
     	return
     };

     this.handleRequest(urlApiRest + '?' + params);
  }


  render() {
  	
	  return (<div>
      <div className="row">
	  	  <h3>Busqueda libros:</h3>
        <div className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="titulo, autor, referencia" id="searchText" type="text" className="validate" />
            </div>
            <div className="input-field col s1">
              <a className="waves-effect waves-light btn" onClick={() => this.handleClick()}>buscar</a>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row" id="application"></div>
      </div>
	   )
  }
}

export default BookMain