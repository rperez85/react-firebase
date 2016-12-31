import React from 'react'
import ReactDOM from 'react-dom';

class RangeSlider extends React.Component {  

  componentDidMount () {
  	$('#' + this.props.id).val(this.props.initVal)
  }
  
  render() {
      return (
			<p className="range-field">
		      <input type="range" id={this.props.id} min={this.props.min} max={this.props.max} />
		    </p>
      )
  }
}

export default RangeSlider