import React from 'react'
import ReactDOM from 'react-dom';
import BookList from '../../components/book-list'


const urlApiRest = 'https://www.googleapis.com/books/v1/volumes';


class BookFiltros extends React.Component {  
  
  constructor(props) {
    super(props);

    this.handleUrlFilter();
  }

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
  	let searchText = $('#searchText').val();
  	let maxResults = 40;
  	let filter = 'partial'; //full, free-ebooks, paid-ebooks, ebooks
  	let printType = 'all'; //books, magazines
  	let orderBy = 'relevance' //newest 

  	let urlFilters = [urlApiRest + "?q=" + searchText];
  	urlFilters.push("&maxResults=" + maxResults);
  	urlFilters.push("&filter=" + filter);
  	urlFilters.push("&printType=" + printType);
  	urlFilters.push("&orderBy=" + orderBy);
  	
  	this.handleRequest(urlFilters.join(''));

  }

  handleUrlFilter () {
  	 let params = document.location.search.substr(1);

     if (!params) {
     	return
     };

     this.handleRequest(urlApiRest + '?' + params);
  }

  render() {
  	
	  return (<div>
	  	<h1>Busqueda libros:</h1>
	  	<input type="text" id="searchText" />
	    <input type="button" value="buscar" onClick={() => this.handleClick()} />
	    <div id="application"></div>
	    </div>
	)
  }
}

export default BookFiltros