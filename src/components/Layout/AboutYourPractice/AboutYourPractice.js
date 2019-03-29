import React, { Component } from 'react';
import ContentBlock from './ContentBlock/ContentBlock';
import VaccineSelection from './VaccineSelection/VaccineSelection';


class AboutYourPractice extends Component {
	render() {
		return (
			<div className="container-fluid practice">
		      <div className="container page">
		      		<ContentBlock />
		      		<VaccineSelection />
		      </div>
		    </div>  
		);
	}
}

export default AboutYourPractice;