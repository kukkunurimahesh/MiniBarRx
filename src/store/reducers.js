import * as defaultData from '../config/config.json';
import axios from 'axios';

//import { ActivityIndicator } from 'react-native';
//Temp Code to be removed.

//const vaccineProducts = defaultData.data.vaccineProducts.internal_medicine;


const initialState = {
	currentStep:1,
	loading: false,
	contactData: {
		first_name: null,
		last_name: null,
		organization: null,
		email: null,
		confirm_email: null,
		phone: null

	},
	contactForm: {
			first_name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'First name *',
					labelClass: 'input'
				},
				value:'',
				validation: {
					required: {
						type: true,
						valid_message : 'Please enter your first name'
					}
				},
				valid: false,
				touched: false,
				validationMessage: ''

			},
			last_name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Last name *',
					labelClass: 'input'
				},
				value:'',
				validation: {
					required:{
						type: true,
					valid_message : 'Please enter your last name'
					}
				},
				valid: false,
				touched: false,
				validationMessage: ''

			},
			organization: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Organization *',
					labelClass: 'input'
				},
				value:'',
				validation: {
					required:{
						type: true,
					valid_message : 'Please enter organization name'
					}
				},
				valid: false,
				touched: false,
				validationMessage: ''

			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Email *',
					labelClass: 'input'
				},
				value:'',
				validation: {
					required:{
						type: true,
						valid_message : 'Please enter your email address'
					},
					validate_email: {
						type: true,
						valid_message: 'Please enter valid email'
					}
					
				},
				valid: false,
				touched: false,
				validationMessage: ''

			},
			confirm_email: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Confirm Email *',
					labelClass: 'input'
				},
				value:'',
				validation: {
					required:{
						type: true,
					valid_message : 'Please enter your confirm email'
					},
					validateConfirmEmail: {
						type: true,
						valid_message: 'Please enter the same email address as above'
					}
				},
				valid: false,
				touched: false,
				validationMessage: ''

			},
			phone: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'Phone *',
					labelClass: 'input'
				},
				value:'',
				validation: {
					required:{
						type: true,
						valid_message : 'Please enter your phone'
					},
					validatePhone: {
						type:true,
						valid_message: 'Please enter phone number in (xxx) xxx-xxxx format'
					}
				},
				valid: false,
				touched: false,
				validationMessage: ''

			}
		},
		contactFormIsValid: false,
		rowIndicationClass: 'row indicators lg d-sm-none d-none d-md-block introduction',
		aboutYourPracticeForm : {
			practice_type: { value: '',label : '' },
			preferred_brand: { className: 'brand hide',value: '',label : '' },
			physicians: { className: 'physicians hide',value:''},
			travel_vacciness: { className: 'travel hide',value: ''},
			flu_vaccines : { className: 'flu hide',value : ''}
		},
		base_vaccine_selection : null,
		avail_vacciness : null,
		physicianValid : true,
		physicianLabelClass : 'input',
		captchaValid : false,
		captchaError : '',
		loadingMask: false
		
};

const getRowIndicationClass = (currentStep) => {
	switch(currentStep) {
		case 1:
			return 'row indicators lg d-sm-none d-none d-md-block introduction';
		
		case 2:
			return 'row indicators lg d-sm-none d-none d-md-block your-practice';
		
		default:
			return 'row indicators lg d-sm-none d-none d-md-block customize_vaccine';
				
	}

}

const checkValidity = (value,rules,state) => {
	let isValid = true;

	let validStatus = {
		isValid: isValid,
		message: ''
	}
	
	console.log(value,rules);
	if(!rules) {
		return isValid;
	}

	if(rules.required.type) {
		validStatus.isValid = value.trim() !=='' && validStatus.isValid;
		validStatus.message = (validStatus.isValid)?'':rules.required.valid_message
	}
	
	
	if (rules.validate_email && value.trim() !=='' && rules.validate_email.type) {
		//console.log('[came to validate email]');
		const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		//console.log(emailValid);
	    validStatus.isValid = emailValid && validStatus.isValid;
		validStatus.message = (validStatus.isValid)?'':rules.validate_email.valid_message
	}

	if(rules.validateConfirmEmail && value.trim() !=='' && rules.validateConfirmEmail.type) {
		const updatedContactForm = {
			...state.contactForm
		};

		const email = updatedContactForm.email.value;
		validStatus.isValid = email===value && validStatus.isValid;
		validStatus.message = (validStatus.isValid)?'':rules.validateConfirmEmail.valid_message
		console.log(email);
	}

	//Phone no validation
	if(rules.validatePhone && value.trim() !=='' && rules.validatePhone.type) {
		const phoneValid = value.match(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/i);

		console.log('[Phone alid]',phoneValid);
		validStatus.isValid = phoneValid && validStatus.isValid;
		validStatus.message = (validStatus.isValid)?'':rules.validatePhone.valid_message
	}
	console.log(validStatus.isValid);
	return validStatus;

};

const updatePracticeData = (state,elemId,element) => {
	

	switch(elemId) {
				case 'practice_type': 
					let baseVaccineSelection = null;
					if(state.aboutYourPracticeForm.flu_vaccines.value!=='') {
						baseVaccineSelection = element.value
					}

					if(state.aboutYourPracticeForm.practice_type.value!=='') {
						console.log('[came to practice upddpdp]',elemId,element.value);
						return {
							...state,
							aboutYourPracticeForm: {
								...state.aboutYourPracticeForm,
								practice_type: {
									...state.aboutYourPracticeForm.practice_type,
									value: element.value,
									label: element.label
								}
							},
							base_vaccine_selection : baseVaccineSelection
						};
						
					} else {						

						return {
							...state,
							aboutYourPracticeForm: {
								...state.aboutYourPracticeForm,
								practice_type: {
									...state.aboutYourPracticeForm.practice_type,
									value: element.value,
									label: element.label
								},
								preferred_brand : {
									...state.aboutYourPracticeForm.preferred_brand,
									className : state.aboutYourPracticeForm.preferred_brand.className.replace('hide','')
								}
							},
							base_vaccine_selection : baseVaccineSelection
						}
					}
				
				case 'preferred_brand' :
					if(state.aboutYourPracticeForm.preferred_brand.value!=='') {
						console.log('[came to practice upddpdp]',elemId,element.value);
						return {
							...state,
							aboutYourPracticeForm: {
								...state.aboutYourPracticeForm,
								preferred_brand: {
									...state.aboutYourPracticeForm.preferred_brand,
									value: element.value,
									label: element.label
								}
							}
						};
						
					} else {						

						return {
							...state,
							aboutYourPracticeForm: {
								...state.aboutYourPracticeForm,
								preferred_brand: {
									...state.aboutYourPracticeForm.preferred_brand,
									value: element.value,
									label: element.label
								},
								physicians : {
									...state.aboutYourPracticeForm.physicians,
									className : state.aboutYourPracticeForm.physicians.className.replace('hide','')
								},
								travel_vacciness : {
									...state.aboutYourPracticeForm.travel_vacciness,
									className : state.aboutYourPracticeForm.travel_vacciness.className.replace('hide','')
								}
							}
						}
					}
				default:
					return state;
				
			}
}

const reducers = (state=initialState,action) => {

	switch(action.type) {
		case 'InputChangedHandler':
			const contactFormNew = {
				...state.contactForm
			};

			contactFormNew[action.inputIdentifier].value = action.event.target.value;

			return {
				...state,
				contactForm: contactFormNew
			}
		case 'InputBluredHandler':
			console.log(action.event.target.value)

			const updatedContactForm = {
				...state.contactForm
			}

			const updatedFormElement = {
				...updatedContactForm[action.inputIdentifier]
			}

			
			const checkValidityStatus = checkValidity(action.event.target.value,updatedFormElement.validation,state);
			updatedFormElement.valid = checkValidityStatus.isValid;
			updatedFormElement.touched = true;
			updatedFormElement.value = action.event.target.value;
			if(updatedFormElement.valid) {
				//updatedFormElement.value = action.event.target.value;
				updatedFormElement.elementConfig.labelClass = 'input state-success';

			} else {
				//updatedFormElement.value = '';
				updatedFormElement.elementConfig.labelClass = 'input state-error';
				
			}
			updatedFormElement.validationMessage = checkValidityStatus.message;
			updatedContactForm[action.inputIdentifier] = updatedFormElement;
			console.log(updatedContactForm);

			let formIsValid = true;

			for (let inputIdentifiers in updatedContactForm) {
				formIsValid = updatedContactForm[inputIdentifiers].valid && formIsValid;
			}
			return {
				...state,
				contactForm: updatedContactForm,
				contactFormIsValid: formIsValid
			};
		case 'ContactButtonClicked':
			console.log('[Contact button clicked]',state);
			const newContactForm = {...state.contactForm };

			let newContactData = {...state.contactData};

			for(let key in newContactForm) {

				if(!state.contactForm[key].valid) {
					const checkValidityStatus = checkValidity(newContactForm[key].value,newContactForm[key].validation,state);
					newContactForm[key].valid = checkValidityStatus.isValid;
					newContactForm[key].touched = true;
					if(newContactForm[key].valid) {
						//newContactForm[key].value = action.event.target.value;
						newContactForm[key].elementConfig.labelClass = 'input state-success';

					} else {
						//newContactForm[key].value = '';
						newContactForm[key].elementConfig.labelClass = 'input state-error';
						
					}
					newContactForm[key].validationMessage = checkValidityStatus.message;
					
					console.log(updatedContactForm);
				} else {
					newContactData[key] = newContactForm[key].value;
				}
			}
			const captchaValidStatus = state.captchaValid;
			if(!captchaValidStatus) {
				return {
					...state,
					contactForm : newContactForm,
					contactData : newContactData,
					captchaError : 'Please Select Re-Captcha'
				}
			}
			let currentStep = state.currentStep;
			let rowStepClass = state.rowIndicationClass;

			if(state.contactFormIsValid) {
				currentStep = currentStep+1;

				rowStepClass = getRowIndicationClass(currentStep);
			}
			const newState = { 
				...state,
				contactForm: newContactForm,
				contactData: newContactData,
				currentStep: currentStep,
				rowIndicationClass: rowStepClass,
				captchaValid : true,
				captchaError : ''
			};

			console.log('[New State]');
			console.log(newState);
			return newState;
		case 'SWITCHSTEP':
			const currStep = state.currentStep;
			//console.log('[Came to SWITCHSTEP]',action.reqStep)
			if(action.reqStep<currStep) {
				//console.log('[Came to SWITCHSTEP]',action.reqStep)
				return {
					...state,
					currentStep: action.reqStep,
					rowIndicationClass: getRowIndicationClass(action.reqStep)
				};
			}
			return state;	
		case 'PRACTICESELECTION' : 
			console.log('[came to practice selection]',action.elemId,action.element.value);
			return updatePracticeData(state,action.elemId,action.element);
		case 'PHYSICIANSCHANGED' :
			console.log('[came to phys selection]',action.elemId,action.element.target.value);	
			return {
						...state,
						aboutYourPracticeForm: {
							...state.aboutYourPracticeForm,
							physicians: {
								...state.aboutYourPracticeForm.physicians,
								value: action.element.target.value
							}
						}
					}
		case 'TRAVELCHANGED' :
			return {
				...state,
				aboutYourPracticeForm : {
					...state.aboutYourPracticeForm,
					travel_vacciness : {
						...state.aboutYourPracticeForm.travel_vacciness,
						value : action.element.target.value
					},
					flu_vaccines : {
						...state.aboutYourPracticeForm.flu_vaccines,
						className : state.aboutYourPracticeForm.flu_vaccines.className.replace('hide','')
					}
				}
			}
		case 'FLUCHANGED' : 

			if(state.aboutYourPracticeForm.physicians.value==='') {
				return {
					...state,
					physicianValid : false,
					physicianLabelClass : 'input state-error'
				};
			}

			return {
				...state,
				aboutYourPracticeForm : {
					...state.aboutYourPracticeForm,
					flu_vaccines : {
						...state.aboutYourPracticeForm.flu_vaccines,
						value : action.element.target.value
					}
				},
				base_vaccine_selection : state.aboutYourPracticeForm.practice_type.value
			};

			

		case 'SAVEPRACTICEDATA' :
			console.log('[Came to SAVEPRACTICEDATA]')
			console.log(state.aboutYourPracticeForm); 
			if(state.aboutYourPracticeForm.physicians.value==='') {
				return {
					...state,
					physicianValid : false,
					physicianLabelClass : 'input state-error'
				};
			}

			return {
				...state,
				currentStep:3,
				physicianValid : true,
				physicianLabelClass : 'input',
				rowIndicationClass : 'row indicators lg d-sm-none d-none d-md-block customize_vaccine',
				avail_vacciness : defaultData.data.vaccineProducts[state.base_vaccine_selection]
			};	

		case 'ONDRAGSTART' :
			console.log('ONDRAGSTART',action.id+'dddd'+action.cart_type)
			action.event.dataTransfer.setData("id",action.id);
			action.event.dataTransfer.setData("cart_type",action.cart_type);
			return state;	
		case 'ONDRAGOVER' :
			console.log('ONDRAGSTART')
			action.event.preventDefault();	
			return state;	
		case 'ONDROP' :
			console.log('on drop ',action.statusType);

			let prdId = action.event.dataTransfer.getData('id');
			let cartridgeType = action.event.dataTransfer.getData('cart_type');
			console.log('cartridgeType',cartridgeType);

			console.log('came inside if',action.selCnt);
			const selectCnt = action.selCnt;
			const defaultCnt = defaultData.data.allowed_vaccines_in_cartridge;
			const remainingSlot = defaultCnt-selectCnt;

			if(remainingSlot===1 && cartridgeType==='MDV') {
				alert("Remaining open spaces in the cartridge is 1. Multi-Dose cannot be place.");
				return state;
			}

			if(action.statusType==='selected' && selectCnt>=defaultCnt) {
				console.log('came inside if');
				alert("Cartridge is full. Please remove some vacciness from cartridge.");
				return state;
			}
			console.log('Selected Product id ',prdId);
			console.log(state.avail_vacciness);
			let newVaccines = {
				...state.avail_vacciness
			};

			for(let key in newVaccines) {
				if(newVaccines[key].id===prdId) {
					newVaccines[key].type = action.statusType;
				}
			}
			
			console.log('[new vacciness]',newVaccines);

			return {
				...state,
				avail_vacciness: newVaccines
			};
		case  'SAVE_SUCC' :
			return {
				...state,
				currentStep:4,
				rowIndicationClass : 'row indicators lg d-sm-none d-none d-md-block confirmation',


			}	
		case 'ONCONFIRMATION' :
			//axios request
			let finalState = {
				...state,
				loadingMask : true
			};
			console.log('Confirmation Step');
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
						default_products : action.defaultPrds,
						selected_products : action.selectPrds
					}
				});

			axios.post('http://192.168.2.220/minibarRx-Demo/mbrxApi/saveMbrxData.php',orderData).then(response => {
				console.log(response);
				console.log(state)
				if(response.status===200 && response.data.status===true) {
					return {
						...state,
						currentStep:4,
						loadingMask: false,
						rowIndicationClass : 'row indicators lg d-sm-none d-none d-md-block confirmation'				
					};
				} else {
					alert('Unable to process your request.');
					return {
						...state,
						loadingMask : false
					};
				}

			}).catch(error => {
				console.log(error);
				return finalState;
			});
			console.log('nre sttate')
			console.log(finalState)
			return finalState;
			
			/*fetch('http://localhost/mbrxApi/saveMbrxData.php', {
				mode : 'no-cors',
				method: 'POST',
				headers: {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'					
				},
				body : JSON.stringify({
					contact_information : state.contactData,
					practice_information : {
						practice_type : state.aboutYourPracticeForm.practice_type.label,
						preferred_brand : state.aboutYourPracticeForm.preferred_brand.label,
						physicians : state.aboutYourPracticeForm.physicians.value,
						travel_vacciness : state.aboutYourPracticeForm.travel_vacciness.value,
						flu_vaccines : state.aboutYourPracticeForm.flu_vaccines.value
					},
					customized_vacciness : {
						default_products : action.defaultPrds,
						selected_products : action.selectPrds
					}
				})
			}).then((data) => {
				console.log(data);
				console.log(state);
				return false;
				if(data.status===true) {
					
				} else {
					alert('Unable to confirm your request due to error '+data.message);
					return state;
				}

				return {
						...state,
						currentStep:4,
						rowIndicationClass : 'row indicators lg d-sm-none d-none d-md-block confirmation'				
					};

			}).catch( (error) => {
				console.log(error);
				alert('Unable to confirm your request. Please contact support.');
				//return false;
				return {
					...state 
				};
			});*?
			break;

			/*	*/
		case 'VALIDATECAPTCHA' :

			return {
				...state,
				captchaValid : true,
				captchaError : ''
			};
		case 'ONBASESELCHANGE' :
		
		return {
			...state,
			currentStep:2,
			rowIndicationClass: getRowIndicationClass(2)
		};	
		default:
			return state;	
	}
};

export default reducers;