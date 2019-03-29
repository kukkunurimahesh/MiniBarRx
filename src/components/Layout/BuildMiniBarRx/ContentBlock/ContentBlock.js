import React from 'react';
import IntroImage from './IntroImage/IntroImage';

const ContentBlock = () =>  (
			<React.Fragment>
				<div className="row">
					<div className="col-md-6">
			            <h1>Build Your MinibarRx</h1>
			            <IntroImage imgclass="main-image mobile d-block d-sm-block d-md-none"  altText="Build Your Mini Bar Rx" />
			            <p>Welcome to MinibarRx, the SMART refrigeration system. To begin building your vaccine inventory, please complete the following form.</p>
			         	<h3 className="mb-font-roboto">Contact information</h3>
			         </div>
			          <div className="col-md-6">
			          </div>
				</div>
			</React.Fragment>
	);
	


export default ContentBlock;

