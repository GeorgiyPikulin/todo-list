import React, {Component} from 'react';
import  './SearchPanel.css';

class SearchPanel extends Component {

	state = {
		term: ''
	};

	onSearchChange = (event) => {
		// this.setState({term: event.target.value});
		// this.props.onSearchChange(event.target.value);
		const term = event.target.value;
		this.setState({ term });
		this.props.onSearchChange(term);
	};

	render() {
		return (
		<input 
			type='text' 
			className="form-control search-input" 
			placeholder = 'type to search'
			value={this.state.term} 
			onChange={this.onSearchChange} /> 
		);
	};
};
  
export default SearchPanel;