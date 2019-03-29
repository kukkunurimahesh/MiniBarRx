import React, { Component } from 'react';
import ContentBlock from './ContentBlock/ContentBlock';
import ContactForm from './ContactForm/ContactForm';

class BuildMiniBarRx extends Component {
	render() {
		return (
			<div className="container-fluid intro">
		      <div className="container page">
		      		<ContentBlock />
		      		<ContactForm />
		      </div>
		    </div>  
		);
	}
}

export default BuildMiniBarRx;