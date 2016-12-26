import React from 'react'  
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'


import CampoBusqueda from './components/campo-busqueda'
import BookInfo from './components/book-info'

/*let empleados = [  
  { id: 1, fullName: "Laya Dueñas", title: "CEO", department: "Business", pic: "empleado01.png" },
  { id: 2, fullName: "Astryd Vallés", title: "CMO", department: "Marketing", pic: "empleado02.png" },
  { id: 3, fullName: "Shantell Meza", title: "CFO", department: "Business", pic: "empleado03.png" },
  { id: 4, fullName: "Sergio Ocampo", title: "CTO", department: "Engineering", pic: "empleado04.png" },
  { id: 5, fullName: "Ares Jiménez", title: "Art Director", department: "Marketing", pic: "empleado05.png" },
  { id: 6, fullName: "Marta Pérez", title: "Frontend Dev", department: "Engineering", pic: "empleado06.png" },
  { id: 7, fullName: "Ellen Balderas", title: "Digital Strategist", department: "Marketing", pic: "empleado07.png" },
  { id: 8, fullName: "Cynthia Valentín", title: "Backend Dev", department: "Engineering", pic: "empleado08.png" },
  { id: 9, fullName: "Bernard Jung", title: "DevOps Engineer", department: "Engineering", pic: "empleado09.png" }
]*/


//ReactDOM.render(<CampoBusqueda />, document.getElementById('root'))  

//var { Router, Route, IndexRoute, Link, browserHistory } = ReactRouter


class App extends React.Component {  
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/index">Home</Link></li>
          <li><Link to="/destacados">Destacados</Link></li>
        </ul>
       {this.props.children}
      </div>
    )
  }
}


class Libro extends React.Component {  
  
   handleClickShowComplete () {
   

    $.getJSON("https://www.googleapis.com/books/v1/volumes/" + this.props.params.id, function(data){
      let bookData = data.volumeInfo;
      ReactDOM.render(<BookInfo info={ bookData } />, document.getElementById('application'))     
    });
    
  }
  


  render() {

    this.handleClickShowComplete();
    return (<div>
        <div id="application"></div>
      </div>
    )
  }
}


class Destacados extends React.Component {  
  render() {
    return (<div>
        <h1>Destacados:</h1>
      </div>)
  }
}


ReactDOM.render((

  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={CampoBusqueda} />
      <Route path="index" component={CampoBusqueda} />
      <Route path="destacados" component={Destacados} />
      <Route path="libro/:id" component={Libro} />
    </Route>

  </Router>  

), document.getElementById('root'))

