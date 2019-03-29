import React from 'react';
import introImage from '../../../../../assets/images/build-mbrx/intro-image-photo.png';

const IntroImage = (props) => (
	<React.Fragment>
		<img src={introImage} alt={props.altText} className={props.imgclass} />
	</React.Fragment>
);

export default IntroImage;