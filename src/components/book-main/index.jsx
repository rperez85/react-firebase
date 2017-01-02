import React from 'react'
import ReactDOM from 'react-dom';
import BookList from '../../components/book-list'
import RangeSlider from '../../components/forms/range-slider'
import ComboSelect from '../../components/forms/combo-select'


const urlApiRest = 'https://www.googleapis.com/books/v1/volumes';

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


class BookMain extends React.Component {  
  
  constructor(props) {
    super(props);

    this.params = {
      searchText: '', 
      maxResults: {
        id: 'rangeSlider',
        initVal: 40
      },
      orderBy: {
        id: 'orderByCombo',
        label: 'ordenar por:',
        initVal: 'relevance'
      },
      printType: {
        id: 'printTypeCombo',
        label: 'tipo de impresión:',
        initVal: 'all'
      },
      filter: {
        id: 'filterCombo',
        label: 'tipo de filtro:',
        initVal: 'partial'
      }
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
    this.params.maxResults.initVal = $('#rangeSlider').val();
    this.params.orderBy.initVal = $('#orderByCombo').val();
    this.params.printType.initVal = $('#printTypeCombo').val();
    this.params.filter.initVal = $('#filterCombo').val();

  	let urlFilters = [urlApiRest + "?q=" + this.params.searchText];
  	urlFilters.push("&orderBy=" +  this.params.orderBy.initVal);
    urlFilters.push("&maxResults=" +  this.params.maxResults.initVal);
    urlFilters.push("&filter=" +  this.params.filter.initVal);
    urlFilters.push("&printType=" +  this.params.printType.initVal);
  	
  	this.handleRequest(urlFilters.join(''));
  }

  handleUrlFilter () {
  	 let params = document.location.search.substr(1);

     if (!params) {
     	return
     };

     //relleno los combos con los parametros
     this.params.searchText = getParameterByName('q');
     this.params.maxResults.initVal = getParameterByName('maxResults');
     this.params.orderBy.initVal = getParameterByName('orderBy');
     this.params.printType.initVal = getParameterByName('printType');
     this.params.filter.initVal = getParameterByName('filter');

     this.handleRequest(urlApiRest + '?' + params);
  }

  handleMoreFiltersClick () {
    if ($('#filters').is(':visible')) {
      $('.moreFilters a').text('búsqueda avanzada');
      $('#filters').hide();
    } else {
      $('.moreFilters a').text('ocultar búsqueda avanzada');
      $('#filters').show();
    }
    
  }


  render() {
  	
	  return (<div>
      <div className="row">
	  	  <h3>Busqueda libros:</h3>
        <div className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input defaultValue={this.params.searchText} placeholder="titulo, autor, referencia" id="searchText" type="text" className="validate" />
            </div>
            <div className="input-field col s2">
              <a className="waves-effect waves-light btn" onClick={() => this.handleClick()}>buscar</a>
            </div>
            <div className="col s4 moreFilters">
              <a onClick={() => this.handleMoreFiltersClick()}>búsqueda avanzada</a>
            </div>
          </div>
        </div>
      </div>
      <div id="filters" style={{display: 'none'}}>
        <div className="row">
          <div className="col s3">
            <label>Mostrar nº de resultados:</label>
            <RangeSlider id={this.params.maxResults.id} initVal={this.params.maxResults.initVal} min="10" max="40"></RangeSlider>
          </div>
          <div className="col s3">
            <ComboSelect id={this.params.orderBy.id} label={this.params.orderBy.label} initVal={this.params.orderBy.initVal} values={[
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
          </div>
          <div className="col s3">
            <ComboSelect id={this.params.printType.id} label={this.params.printType.label} initVal={this.params.printType.initVal} values={[
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
          <div className="col s3">
            <ComboSelect id={this.params.filter.id} label={this.params.filter.label} initVal={this.params.filter.initVal} values={[
            {
              'key': 0,
              'value': 'partial',
              'label': 'parcial'
            },
            {
              'key': 1,
              'value': 'full',
              'label': 'full'
            },
            {
              'key': 2,
              'value': 'ebooks',
              'label': 'solo ebooks'
            },
            {
              'key': 3,
              'value': 'free-ebooks',
              'label': 'ebooks gratuitos'
            },
            {
              'key': 4,
              'value': 'paid-ebooks',
              'label': 'ebooks de pago'
            },
            
            ]}>
            </ComboSelect>
          </div>
        </div>
      </div>
      
      <div className="row" id="application"></div>
      </div>
	   )
  }
}

export default BookMain