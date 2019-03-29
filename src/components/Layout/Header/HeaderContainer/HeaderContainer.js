import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import '../../../../assets/css/custom.css';
import { connect } from 'react-redux';


class HeaderContainer extends Component {
	render() {
		return (
			 	<React.Fragment>
				<header id="js-header" className="u-header u-header--static">
					<div className="container-fluid u-header__section u-header__section--light g-bg-white g-transition-0_3 g-py-35">
						<nav className="js-mega-menu navbar navbar-expand-lg hs-menu-initialized hs-menu-horizontal">
							<div className="container">
								<a href="/minibarRx-Demo" className="navbar-brand g-ml-0--sm">
					              <Logo />
					            </a>
							</div>
						</nav>
					</div>

					<div className={this.props.rowIndicatorClass}>
				        <div className="container full">
				          <div className="row align-items-center">
				            <div className="col-md-3 arrow-text" onClick={() => this.props.onChangeStep(1)}>Build Your MinibarRx</div>
				            <div className="col-md-3 arrow-text" onClick={() => this.props.onChangeStep(2)}>About Your Practice</div>
				            <div className="col-md-3 arrow-text" onClick={() => this.props.onChangeStep(3)}>Customize Vaccine Selection</div>
				            <div className="col-md-3 arrow-text">Confirmation & Timeline</div>
				          </div>
				        </div>
				    </div>

				    <div className="row indicators sm d-block d-sm-block d-md-none">
				        <div className="container partial">
				          <div className="row align-items-center intro" style={{display: 'none'}}>
				            <div className="col-6 arrow-text">Build Your MinibarRx</div>
				            <div className="col-6 arrow-text">About Your Practice</div>
				          </div>
				          
				          <div className="row align-items-center practice" style={{display: 'none'}}>
				            <div className="col-6 arrow-text">About Your Practice</div>
				            <div className="col-6 arrow-text">Customize Vaccines</div>
				          </div>
				          
				          <div className="row align-items-center custom" style={{display: 'none'}}>
				            <div className="col-6 arrow-text">Customize Vaccines</div>
				            <div className="col-6 arrow-text">Confirmation & Timeline</div>
				          </div>
				          
				          <div className="row align-items-center confirm" style={{display: 'none'}}>
				            <div className="col-6 arrow-text">Confirmation & Timeline</div>
				            <div className="col-6 arrow-text">&nbsp;</div>
				          </div>
				        </div>
				      </div>
				      
				      <div className="row indicators-bg mb-bg-bluegray"></div>
				      <div className="row indicators-bottom mb-bg-dkblue"></div>
				</header>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	//console.log('Came to props ');
	//console.log(state);
	return {
		rowIndicatorClass: state.rowIndicationClass
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onChangeStep: (requestedStep) => dispatch({type: 'SWITCHSTEP',reqStep:requestedStep})
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(HeaderContainer);