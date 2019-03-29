import React from 'react';
import {Helmet} from 'react-helmet';
import bootstrapCss from '../../../../assets/vendor/bootstrap/bootstrap.css';

const HeaderCommon = () => (
	<React.Fragment>
		<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" />
  		<link href="https://fonts.googleapis.com/css?family=Vollkorn:400,400i,600,600i,700,700i,900,900i" rel="stylesheet" /> 
  		<link rel="stylesheet" href={bootstrapCss} /> 
  		<link rel="stylesheet" href="../../../../assets/vendor/icon-hs/style.css" />
 		<link rel="stylesheet" href="../../../../assets/vendor/animate.css" />

 		<link rel="stylesheet" href="../../../../assets/css/unify-core.css" />
  		<link rel="stylesheet" href="../../../../assets/css/unify-components.css" />
  		<link rel="stylesheet" href="../../../../assets/css/unify-globals.css" />

  		<link rel="stylesheet" href="../../../../assets/css/custom.css" />
  		<link rel="stylesheet" href="../../../../assets/vendor/sky-forms-2.0.5/css/custom-sky-forms.css" />
  		<Helmet>
	  		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-2542116-27"></script>
	  		

		</Helmet>  
	</React.Fragment>
);

export default HeaderCommon;