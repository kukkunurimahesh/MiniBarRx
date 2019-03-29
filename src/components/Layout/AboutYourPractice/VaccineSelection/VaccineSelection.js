import React, { Component } from 'react';
import './VaccineSelection.css';
import Select from 'react-select';
import * as defaultData from '../../../../config/config.json';
import { connect } from 'react-redux';
import Button from '../../../UI/Button/Button';
import VaccineSelectionList from './VaccineSelectionList/VaccineSelectionList';

const practiceType = [];

const defaultPracticeType = defaultData.data.practiceType;
for(let key in defaultPracticeType) {	
	practiceType.push(defaultPracticeType[key]);
}

const preferredBrands = [];
const defaultBrands = defaultData.data.preferredBrands;
for(let key in defaultBrands) {	
	preferredBrands.push(defaultBrands[key]);
}


const practiceText = 'What type of practice do you have?';

class VaccineSelection extends Component {	
	

	render() {
		return (
			<React.Fragment>
				<form 					 
					className="sky-form" id="mbrx_build_base_selection_form" 
					name="mbrx_build_contact_info_form"  noValidate="novalidate">
					<div className="row box">
            		<div className="col-md-6">
					<section>
		                <div className="dropdown">		                  
		                  <Select 
		                  		id="practice_type"
		                  		options={ practiceType } 
		                  		value={this.props.abtPracticeForm.practice_type.value==='' ? null: this.props.abtPracticeForm.practice_type} 
		                  		placeholder={practiceText}
		                  		onChange={ (event) => this.props.onPracticeSelection(event,'practice_type') } />
		                </div>
		              </section>
		              <section key="brand" className={this.props.abtPracticeForm.preferred_brand.className}>
		                <div className="dropdown">
		                	<Select 
		                		id="preferred_brand"
		                		options={ preferredBrands }		    
		                		placeholder="Which vaccine brand do you prefer?"             		
		                		
		                		value={this.props.abtPracticeForm.preferred_brand.value==='' ? null: this.props.abtPracticeForm.preferred_brand} 		                		
		                		onChange={ (event) => this.props.onPracticeSelection(event,'preferred_brand') } />
		                </div>
		              </section>

		             <section  key="physicians" className={this.props.abtPracticeForm.physicians.className}>
		                <label className={this.props.physicianLabelClass}>
		                  <input 
		                  type="text" 
		                  name="number_physicians" 
		                  id="number_physicians" 
		                  value={this.props.abtPracticeForm.physicians.value}
		                  onChange={ (event) => this.props.onPhysicansChanged(event,'physicians') } 
		                  placeholder="How many physicians are at your practice? *" maxLength="4" />		                 
		                </label>
		                {this.props.physicianValid===false && <em className="invalid">Please enter physicians value </em>}
		              </section> 

		            <section key="travel" className={this.props.abtPracticeForm.travel_vacciness.className}>
	                Does your practice administer travel vaccines?
	                <div className="inline-group">
	                  <label className="radio">
	                  	<input type="radio" 
	                  		checked={this.props.abtPracticeForm.travel_vacciness.value==='1'}
	                 		 name="travel_vaccines" 
	                 		 id="travel_vaccines-1"
	                 		 onChange = { (event) => this.props.onTravelChanged(event,'travel_vaccines-1') } 
	                 		 value="1" /><i></i>Yes</label>
	                  <label className="radio">
	                  	<input type="radio" 
	                  		checked={this.props.abtPracticeForm.travel_vacciness.value==='0'}
	                  		name="travel_vaccines" 
	                  		onChange = { (event) => this.props.onTravelChanged(event,'travel_vaccines-2') }
	                  		id="travel_vaccines-2" 
	                  		value="0" /><i></i>No</label>
	                </div>
	              </section>

	              <section className={this.props.abtPracticeForm.flu_vaccines.className}>
	                Does your practice administer flu vaccine?
	                <div className="inline-group">
	                  <label className="radio">
	                  	<input type="radio" 
	                  		checked={this.props.abtPracticeForm.flu_vaccines.value==='1'}
	                  		name="flu_vaccines" 
	                  		id="flu_vaccines-1" 
	                  		onChange = { (event) => this.props.onFluChanged(event,'flu_vaccines-1') }
	                  		value="1" /><i></i>Yes</label>
	                  <label className="radio">
	                  	<input type="radio" 
	                  		checked={this.props.abtPracticeForm.flu_vaccines.value==='0'}
	                  		name="flu_vaccines" 
	                  		id="flu_vaccines-2" 
	                  		onChange = { (event) => this.props.onFluChanged(event,'flu_vaccines-2') }
	                  		value="0" /><i></i>No</label>
	                </div>
	              </section>  
	            </div>

	            <div className="col-md-6">
	              <div className="display-selection">
	                
	                <div className="devider"></div>
	                <div className="body text-center" id="vaccine-selection">
	                    <VaccineSelectionList 
	                    	baseVaccineSelection={this.props.baseVaccSelec}
	                    	vaccine_brand={this.props.abtPracticeForm.preferred_brand.label}
	                    	practice_type={this.props.abtPracticeForm.practice_type.label} />
	                </div>
	              </div>
	            </div>

	            </div>
	                
	               { this.props.abtPracticeForm.flu_vaccines.value!=='' && <Button 
		        		btnType="button" 
		        		clicked={this.props.onButtonClicked}
		        		btnName="submit" 
		        		btnClass= 'btn btn-primary btn-lg arrow-body' 
		        		btnLabel="Next – Customize Your Selection" /> } 
				</form>
          
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		abtPracticeForm: state.aboutYourPracticeForm,
		baseVaccSelec : state.base_vaccine_selection,
		physicianValid : state.physicianValid,
		physicianLabelClass : state.physicianLabelClass		
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onPracticeSelection: (event,id) => dispatch({type:'PRACTICESELECTION',element: event,elemId:id}),
		onPhysicansChanged: (event,id) => dispatch({type: 'PHYSICIANSCHANGED',element: event,elemId: id}),
		onTravelChanged: (event,id) => dispatch({type: 'TRAVELCHANGED',element: event,elemId: id}),
		onFluChanged: (event,id) => dispatch({type: 'FLUCHANGED',element: event,elemId: id}),
		onButtonClicked: () => dispatch({type: 'SAVEPRACTICEDATA'})
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(VaccineSelection);