import React from 'react';
import NumberFormat from 'react-number-format';

const Input = (props) => {
	let inputElement=null;
	let errorMessage = null;
	//console.log(props);
	switch(props.elementType) {
		case 'text' :
			inputElement = <label className={props.labelClass}>
                  <input type="text" 
                  name={props.id} 
                  id={props.id}
                  placeholder={props.elementConfig.placeholder}
                  maxLength="50" 
                  value={props.value}
                  onBlur={props.blured}
                  onChange={props.changed} />
                </label>
            if(!props.validStatus) {
            	errorMessage = <em className="invalid">{props.validationMessage}</em>
            }    

		break;

		case 'number':
			inputElement = <label className={props.labelClass}>
								<NumberFormat 
									format="(###) ###-####" 
									mask="X"
									value={props.value}
									placeholder={props.elementConfig.placeholder}
									name={props.id}
									onBlur={props.blured}
									onChange={props.changed}  /> 
							</label>
			if(!props.validStatus) {
            	errorMessage = <em className="invalid">{props.validationMessage}</em>
            }								

		break;
		default:
			inputElement = <input type="text" />
		break;
	}

	return(
		<React.Fragment>
			{inputElement}
			{errorMessage}		
		</React.Fragment>
	)
}

export default Input;