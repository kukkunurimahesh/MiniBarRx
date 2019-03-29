import React from 'react';
import ImpLinks from './ImpLinks/ImpLinks';
import FollowUs from './FollowUs/FollowUs';
import FooterLogo from './FooterLogo/FooterLogo';
import Copyright from './Copyright/Copyright';

const Footer = () => {
	return (
		<React.Fragment>
			<footer className="mb-bg-dkblue g-mt-60">
				<div className="container">
					<div className="row g-pt-50  g-pb-60 ">
						<ImpLinks />
						<FollowUs />
						<FooterLogo />
					</div>
				</div>
				<Copyright />
			</footer>
		</React.Fragment>
	);
}

export default Footer;