import React, { Component } from 'react';
//import Header from './Header/Header';
import { connect } from 'react-redux';
import HeaderContainer from './Header/HeaderContainer/HeaderContainer';
import BuildMiniBarRx from './BuildMiniBarRx/BuildMiniBarRx';
import AboutYourPractice from './AboutYourPractice/AboutYourPractice';
import CustomizeVaccine from './CustomizeVaccine/CustomizeVaccine';
import Confirmation from './Confirmation/Confirmation';
import Footer from './Footer/Footer';

class Layout extends Component {

	render() {
		return (
			<React.Fragment>
				
					<main>
						<HeaderContainer />
						{this.props.curStep===1 && <BuildMiniBarRx /> }
						{this.props.curStep===2 && <AboutYourPractice /> }
						{this.props.curStep===3 && <CustomizeVaccine /> }
						{this.props.curStep===4 && <Confirmation />}
						<Footer />
					</main>
				
			</React.Fragment>
		)
	};
}

const mapStateToProps = state => {
	console.log('came to layout');
	console.log(state);
	return {
		curStep: state.currentStep
	}
}
export default connect(mapStateToProps)(Layout);