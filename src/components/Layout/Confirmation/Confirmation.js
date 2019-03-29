import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentBlock from './ContentBlock/ContentBlock';
import defaultData from '../../../config/config.json';


class Confirmation extends Component {


	render() {
	
	let selectedVacc = [];
	const vacciness = this.props.avaiVacc;
	
	for(let key in vacciness) {
		if(vacciness[key].type==='selected') {
			selectedVacc.push(
				vacciness[key]
			);
		}
	}
	const defaultProducts = defaultData.data.vaccineProducts.default;
		
	console.log('defaultProducts',defaultProducts);
	console.log('selectedVacc',selectedVacc);
		
		let finalPrdArr = [];	
		

		for(let key in defaultProducts) {
			
			for(let xkey in defaultProducts[key]) {				
					finalPrdArr.push(defaultProducts[key][xkey]);					
			}			
		}
		
	

	function chunkData(array,size) {
		let chunkarray = [];

		let index = 0;
		while (index < array.length) {
		    chunkarray.push(array.slice(index, size + index));
		    index += size;
		}

		return chunkarray;
	}
		
	let baseVaccines = chunkData(finalPrdArr,15);	

	let customVaccines = chunkData(selectedVacc,2);


	console.log('baseVaccines',baseVaccines);
	console.log('customVaccines',customVaccines);
	var today = new Date(),
    currDate =  (today.getMonth() + 1) + '/' + today.getDate()+'/'+today.getFullYear();

		return (
			<React.Fragment>
				<div className="container-fluid practice">
			      <div className="container page">
			      		<ContentBlock 
			      			practice={this.props.practice_type} 
			      			brand={this.props.preferred_brand} 
			      			vacciness = {customVaccines}
			      			defaultPrds = {baseVaccines} 
			      			reqDate = {currDate} />
			      		
			      </div>
			    </div>  
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		practice_type : state.aboutYourPracticeForm.practice_type.label,
		preferred_brand : state.aboutYourPracticeForm.preferred_brand.label,
		avaiVacc : state.avail_vacciness	
	}	
};

export default connect(mapStateToProps)(Confirmation); 