import React, { Component } from 'react';
import Input from '../../../UI/Input/Input';
//import { Field, reduxForm } from 'redux-form';
import IntroImage from '../ContentBlock/IntroImage/IntroImage';
import Button from '../../../UI/Button/Button';
import { connect } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';

class ContactForm extends Component {
	state = {
		
	}

	
	render() {
		//console.log(this.props.contactForm);
		const formElementArray = [];
		for (let key in this.props.contactForm) {
			formElementArray.push({
				id:key,
				config: this.props.contactForm[key]
			});
		}
		//console.log(formElementArray);
		return (
			<React.Fragment>
				<form className="sky-form" id="mbrx_build_contact_info_form" name="mbrx_build_contact_info_form"  noValidate="novalidate">
		        	<div className="row">
		        		<div className="col-md-6">
		        		{formElementArray.map(formElement => (
		        			<section key={formElement.id}>
		        				<Input key={formElement.id}
		        					blured={(event) => this.props.onInputBlured(event,formElement.id)}
		        					changed = {(event) => this.props.onInputChanged(event,formElement.id)}
		        					id={formElement.id}
		        					touched = {formElement.config.touched}
									elementType={formElement.config.elementConfig.type} 
									elementConfig={formElement.config.elementConfig} 
									value={formElement.config.value}
									labelClass = {formElement.config.elementConfig.labelClass}
									validationMessage = {formElement.config.validationMessage}
									validStatus = {formElement.config.valid}

		        					/>
		        			</section>
		        		))}	

		        		<ReCAPTCHA
						    sitekey="6LeY14UUAAAAACAfrIrdd6XmLdtVK9Cdq-oKS7Jg"
						    onChange={this.props.onCaptchaValidate} 
						    render="explicit"
						  />
						  <em className="invalid">{this.props.captchaError}</em>
		        		</div>
		        		<div className="col-md-6">
			              <IntroImage imgclass="main-image d-sm-none d-none d-md-block"  altText="Build Your Mini Bar Rx" />
			            </div>
		        	</div>
		        	<Button 
		        		btnType="button" 
		        		clicked={this.props.onButtonClicked}
		        		btnName="submit" 
		        		btnClass="btn btn-primary btn-lg arrow-body" 
		        		btnLabel="Next – Tell Us About Your Practice" />
		        </form>  
					
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		curStep: state.currentStep,
		contactForm: state.contactForm,
		captchaError : state.captchaError
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onInputBlured: (event,inputIdentifier) => dispatch({type:'InputBluredHandler',event:event,inputIdentifier:inputIdentifier}),
		onInputChanged: (event,inputIdentifier) => dispatch({type:'InputChangedHandler',event:event,inputIdentifier:inputIdentifier}),
		onButtonClicked: () => dispatch({type:'ContactButtonClicked'}),
		onCaptchaValidate: () => dispatch({type:'VALIDATECAPTCHA'})		
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactForm);

