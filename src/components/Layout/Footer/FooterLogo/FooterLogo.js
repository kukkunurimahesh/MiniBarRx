import React from 'react';
import logoMinBarRxFooter from '../../../../assets/images/build-mbrx/logo-minibar-rx-footer.gif';
import logoFffFooter from '../../../../assets/images/build-mbrx/logo-fff-footer.gif';

const FooterLogo = () => {
	return (
		<div className="col-md-12 col-lg-4 d-flex flex-column align-items-end justify-content-center logos">
	        <img className="g-py-20 logo-mbrx" src={logoMinBarRxFooter} alt="" />
	        <img className="g-pb-20 logo-fff" src={logoFffFooter} alt="" />
	      </div>
	);
}

export default FooterLogo;