import React from 'react'
import ReactDOM from 'react-dom';
import EmpleadoList from '../../components/empleado-list'



class CampoBusqueda extends React.Component {  
  handleClick () {
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=" + $('#searchText').val() + '&maxResults=40', function(data){
	
		let bookData = data.items;
		for(let i = 0; i < bookData.length; i++) {
			bookData[i]['key'] = i;
		}

		ReactDOM.render(<EmpleadoList listado={ bookData } />, document.getElementById('application'))  
	});
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

export default CampoBusqueda