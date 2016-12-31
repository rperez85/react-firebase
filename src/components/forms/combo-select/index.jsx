import React from 'react'
import ReactDOM from 'react-dom';

class ComboSelect extends React.Component {  

  componentDidMount () {
    $('#' + this.props.id).material_select();
  }
  
  render() {
      return (
			<div className="input-field col s12">
      <select id={this.props.id}>
        {
          this.props.values.map((value) => {      
            return <option key={value.key} value={value.value}>{value.label}</option>
          })
        }
      </select>
      <label>Filtro</label>
    </div>
      )
  }
}

export default ComboSelect