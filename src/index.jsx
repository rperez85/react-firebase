import React from 'react'  
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import BookFiltros from './components/book-filtros'
import BookInfo from './components/book-info'
import BookDestacados from './components/book-destacados'


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


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BookFiltros} />
      <Route path="index" component={BookFiltros} />
      <Route path="destacados" component={BookDestacados} />
      <Route path="libro/:id" component={BookInfo} />
    </Route>

  </Router>  

), document.getElementById('root'))

