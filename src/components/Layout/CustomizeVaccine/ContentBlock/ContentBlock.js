import React, { Component } from 'react';
//import { Draggable, Droppable } from 'drag-drop';
import defaultData from '../../../../config/config.json';
import { connect } from 'react-redux';
//import './ContentBlock.css';
import Button from '../../../UI/Button/Button';
import { saveMbrxData } from '../SaveData';

class  ContentBlock extends Component {
	
	getClassByType = (cartridge_type,draggable) => {
		let cartClass = '';
		switch(cartridge_type) {
			case 'SDV' :
				cartClass= (draggable)?'cartridge-draggable draggable':'cartridge-placed'
			break;
			case 'PFS' :
				cartClass= (draggable)?'cartridge-draggable-sc draggable':'cartridge-placed-sc'
			break;	
			case 'MDV' :
				cartClass= (draggable)?'cartridge-draggable-dw draggable':'cartridge-placed-dw'
			break;	
			default :
				cartClass= (draggable)?'cartridge-draggable draggable':'cartridge-placed'
			break;			
		}

		return cartClass;

	}
		

	render() {

		
		const baseVaccines = this.props.vaccines;
		console.log('baseVaccines ',baseVaccines);

		//format the default vacciness to 15 each row
		let formtDefaultPrds = [];
		var i,j,chunk=11;
		for(i=0,j=baseVaccines.default.length;i<j;i+=chunk) {
			formtDefaultPrds.push(baseVaccines.default.slice(i,i+chunk));
		}
		console.log(formtDefaultPrds);
		const defaultPrdArr = this.props.defaultPrds;
		

		let opneSpt = [];
		let opKey = null;
		
		console.log('selected',baseVaccines.selected);

		//Find out the selected vaccines count based on the SDV,PFS and MDV
		let cartridgeCnt = 0;
		for(let ids in baseVaccines.selected) {
				if(baseVaccines.selected[ids].cartridge_type==='MDV') {
					cartridgeCnt = cartridgeCnt+2;
				} else {
					cartridgeCnt = cartridgeCnt+1;
				}
		}

		const selectedCnt = cartridgeCnt+24;
		const remainingCnt = 30-selectedCnt;


		console.log('base length  ',baseVaccines.selected.length);
	    for(i=1;i<=(6-cartridgeCnt);i++) {
	    		if(cartridgeCnt<6) {
	    		opKey = Math.floor(100000 + Math.random() * 900000);	
	    		opneSpt.push(<div key={opKey} className="cartridge-open-spot"></div>);
	    	}
	    }
	    console.log('opneSpt ',opneSpt);

	    

	    for(let ids in baseVaccines.selected) {
	    	opneSpt.push(<div key={ids} className={this.getClassByType(baseVaccines.selected[ids].cartridge_type,1)} draggable onDragStart = {(e) => {this.props.onPrdDragStart(e,baseVaccines.selected[ids].id)}}>
	    		<div  className="vaccine-name mb-color-dkblue">
	              						{baseVaccines.selected[ids].vaccineName.slice(0,(baseVaccines.selected[ids].vaccineName.indexOf('('))).trim()}
	              						</div></div>
	    	)
	    }
	    
	    console.log('opneSptdd ',opneSpt);
	
	return (
		<React.Fragment>
			<div className="row">
	          <div className="col-12">
	            <h1 className="customize">Customize Your Cabinet Inventory</h1>
	          </div>
	      	  

		      	<div className="col-6 d-none d-md-block">
		      		<h3 className="mb-font-roboto base-selection">Your Base Selection<span> – {this.props.abtPracticeForm.practice_type.label}, {this.props.abtPracticeForm.preferred_brand.label} Centric</span></h3>
	   				<h3 className="mb-font-roboto customize">Customize<span> – Add customized vaccines by dragging them into the remaining open spaces on the refrigeration system.</span></h3>
	            	<div className="custom-selection">
	            		<div className="cartridge-container droppable" onDragOver = {(e) => this.props.onPrdDragOver(e)}
	        		onDrop = {(e) => this.props.onPrdDrop(e,'default',selectedCnt)}>
	            		{formtDefaultPrds.map((prdCtr,index) => 
	            			<div key={index} className="d-flex flex-row justify-content-start">	
		            			{Object.values(prdCtr).map((prds,nindx) => 
		            				
		            				<div key={nindx} style={{margin:'5px'}} className={this.getClassByType(prds.cartridge_type,1)} draggable 
		            				onDragStart = {(e) => {this.props.onPrdDragStart(e,prds.id,prds.cartridge_type)}}>
		            					<div className="vaccine-name">
		            					{prds.vaccineName.slice(0,(prds.vaccineName.indexOf('('))).trim()}
		            					</div>
		            				</div>
		            			)}
	            			</div>
	            		)}
	            			
	            		</div>
	            	</div>
	            	{ selectedCnt>0 && <Button 
		        		btnType="button" 
		        		
		        		clicked={ (e) => this.props.onChangeBaseSelection(e)}
		        		btnName="submit" 
		        		btnClass= 'btn btn-primary orange btn-md mb-font-roboto' 
		        		btnLabel="Change My Base Vaccine Package" /> }
	            	
		      	</div>

		     
		      <div className="col-6 d-none d-md-block">
	            <div className="cabinet d-flex align-items-end">
	              <div className="cartridge-container">
	              	{defaultPrdArr.map((prdCtr,index) => 
	              	<div key={index} className="d-flex flex-row justify-content-start droppable" 
	              		onDragOver = {(e) => this.props.onPrdDragOver(e)} 
	              		onDrop = {(e) => this.props.onPrdDrop(e,'selected',selectedCnt) }>
	              			{index===0 && opneSpt}
	              			{Object.values(prdCtr).map((prds,idx) => 
	              				<div key={prds.id}  className={this.getClassByType(prds.cartridge_type,0)}>
	              						<div className="vaccine-name mb-color-dkblue">
	              						{prds.vaccineName.slice(0,(prds.vaccineName.indexOf('('))).trim()}
	              						</div>
	              				</div>
	                  	
	              			)}
	              	</div>
	              	)}
	              </div>
	            </div>
	            
	            <div className="count-display mb-font-roboto">
	              <div className="selected mb-color-dkblue-lt"><span className="number mb-bg-dkblue">{selectedCnt}</span> Selected Items</div>
	              <div className="remaining mb-color-dkblue-lt"><span className="number mb-bg-dkblue">{remainingCnt}</span> Items Remaining</div>
	            </div>
	            
	          </div>
	          
	        </div>
	        
	        <form className="g-mt-60">
	        { selectedCnt>0 && <Button 
		        		btnType="button" 
		        		
		        		clicked={ () => this.props.onSave(this.props.postOrderData)}
		        		btnName="submit" 
		        		btnClass= 'btn btn-primary btn-lg arrow-body' 
		        		btnLabel="Save – Review Order & Timeline" /> } 
	        </form>
		</React.Fragment>
	);
}


}

const mapStateToProps = state => {
	console.log(state);
	const defaultProducts = defaultData.data.vaccineProducts.default;
	console.log('defaultProducts Arr',defaultProducts);
	let defaultPrdArr = [];

	for(let key in defaultProducts) {
			defaultPrdArr.push(defaultProducts[key]);
	}
	console.log('defaultProducts Arr',defaultPrdArr);

	const vaccineProducts = state.avail_vacciness;
	let vaccines = {
		default : [],
		selected : []
	};
		
	console.log('Vaccine Products',vaccineProducts);
		

		for(let key in vaccineProducts) {
			//Create an array with vacciness with two categories : [default,selected]
			
				//console.log('Vaccine Products 2',vaccineProducts[key][vkey]);
				vaccines[vaccineProducts[key].type].push(
					vaccineProducts[key]
				);
			
			
		}
	console.log('Vaccines',vaccines);	

	let orderData = JSON.stringify({
					contact_information : state.contactData,
					practice_information : {
						practice_type : state.aboutYourPracticeForm.practice_type.label,
						preferred_brand : state.aboutYourPracticeForm.preferred_brand.label,
						physicians : state.aboutYourPracticeForm.physicians.value,
						travel_vacciness : state.aboutYourPracticeForm.travel_vacciness.value,
						flu_vaccines : state.aboutYourPracticeForm.flu_vaccines.value
					},
					customized_vacciness : {
						default_products : defaultPrdArr,
						selected_products : vaccines.selected
					}
				});


	return {
		abtPracticeForm : state.aboutYourPracticeForm,
		baseVaccineSelection : state.base_vaccine_selection,
		availVacciness : state.avail_vacciness,
		postOrderData : orderData,
		vaccines : vaccines,
		defaultPrds : defaultPrdArr 
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onPrdDragStart : (e,id,ctype) => dispatch({type : 'ONDRAGSTART',event: e, id: id,cart_type: ctype}),
		onPrdDragOver : (e) => dispatch({type : 'ONDRAGOVER',event : e}),
		onPrdDrop : (e,type,cnt) => dispatch({type: 'ONDROP',event : e, statusType: type, selCnt: cnt}),
		onButtonClicked: (defPrd,selPrd) => dispatch({type: 'ONCONFIRMATION',defaultPrds : defPrd, selectPrds : selPrd}),
		onSave : (orderData) => dispatch(saveMbrxData(orderData)),
		onChangeBaseSelection : (e) => dispatch({type: 'ONBASESELCHANGE'})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ContentBlock);