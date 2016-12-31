import React from 'react'
import ReactDOM from 'react-dom';
import BookList from '../../components/book-list'
import RangeSlider from '../../components/forms/range-slider'
import ComboSelect from '../../components/forms/combo-select'


const urlApiRest = 'https://www.googleapis.com/books/v1/volumes';


class BookMain extends React.Component {  
  
  constructor(props) {
    super(props);

   

    this.params = {
      maxResults: {
        id: 'rangeSlider',
        initVal: 40
      },
      searchText: '', 
      //maxResults: 40,
      filter: 'partial', //full, free-ebooks, paid-ebooks, ebooks
      //printType: 'all', //books, magazines
      orderBy: {
        id: 'orderByCombo',
        initVal: 'relevance'
      },
      printType: {
        id: 'printTypeCombo',
        initVal: 'partial'
      }
      //'relevance' //newest 
    }
  }

  componentWillMount () {
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
  	this.params.searchText = $('#searchText').val();
    /*this.params.maxResults = 
    this.params.filter = 
    this.params.printType = 
    this.params.orderBy = */
    this.params.maxResults.initVal = $('#rangeSlider').val();
    this.params.orderBy.initVal = $('#orderByCombo').val();
    this.params.printType.initVal = $('#printTypeCombo').val();

  	let urlFilters = [urlApiRest + "?q=" + this.params.searchText];
  	urlFilters.push("&orderBy=" +  this.params.orderBy.initVal);
    urlFilters.push("&maxResults=" +  this.params.maxResults.initVal);
    urlFilters.push("&filter=" +  this.params.filter);
    urlFilters.push("&printType=" +  this.params.printType.initVal);
  	
  	this.handleRequest(urlFilters.join(''));

  }

  handleUrlFilter () {
  	 let params = document.location.search.substr(1);

     if (!params) {
     	return
     };

     //relleno los combos con los parametros
     this.params.maxResults.initVal = 20;

     this.handleRequest(urlApiRest + '?' + params);
  }

  handleMoreFiltersClick () {

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
              <a onClick={() => this.handleMoreFiltersClick}>busqueda avanzada</a>
            </div>
          </div>
        </div>
      </div>
      <div id="filters">
        <RangeSlider id={this.params.maxResults.id} initVal={this.params.maxResults.initVal} min="10" max="40"></RangeSlider>
        <ComboSelect id={this.params.orderBy.id} initVal={this.params.orderBy.initVal} values={[
        {
          'key': 0,
          'value': 'relevance',
          'label': 'relevancia'
        },
        {
          'key': 1,
          'value': 'newest',
          'label': 'nuevos'
        }
        ]}>
        </ComboSelect>
        <ComboSelect id={this.params.printType.id} initVal={this.params.printType.initVal} values={[
        {
          'key': 0,
          'value': 'all',
          'label': 'todos'
        },
        {
          'key': 1,
          'value': 'books',
          'label': 'libros'
        },
        {
          'key': 2,
          'value': 'magazines',
          'label': 'revistas'
        }
        ]}>
        </ComboSelect>
      </div>
      
      <div className="row" id="application"></div>
      </div>
	   )
  }
}

export default BookMain