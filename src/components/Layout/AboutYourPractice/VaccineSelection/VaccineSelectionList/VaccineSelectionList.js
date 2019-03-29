import React from 'react';
import * as defaultData from '../../../../../config/config.json';




const VaccineSelectionList = (props) => {
	
		let selectionList = [];
		let selectionClass = 'default-state';
		const vaccineProducts = defaultData.data.vaccineProducts[props.baseVaccineSelection];
		console.log(vaccineProducts);

		if(props.baseVaccineSelection===null) {
			selectionList.push('Your vaccine base selection list.');
		} else {
			selectionClass = 'selection';
				
			selectionList.push(<h5 key="heading" className="fade-in mb-font-roboto selection-margin"><em>{props.vaccine_brand}, {props.practice_type} Vacciness</em></h5>);
			
			for(let key in vaccineProducts) {

				selectionList.push(<p key={key} className="fade-in">{vaccineProducts[key].vaccineName}</p>);
				
			}
			
		}
		console.log(selectionList);
		return (
			
				<React.Fragment>
					<div className={selectionClass}>
						{selectionList}
					</div>
					
				</React.Fragment>
			
		);
	
}




export default VaccineSelectionList;