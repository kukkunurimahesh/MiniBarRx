import React, { Component } from 'react';
import ContentBlock from './ContentBlock/ContentBlock';

class CustomizeVaccine extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="container-fluid custom">
			      <div className="container page">
			      		<ContentBlock />
			      		
			      </div>
			    </div>  
			</React.Fragment>
		);
	}
}

export default CustomizeVaccine;