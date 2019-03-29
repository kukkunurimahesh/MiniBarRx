import React from 'react';

const ContentBlock = (props) => (
	

	<React.Fragment>

			<div className="row content-header">
				<div className="col-12">
					<h1>Your MinibarRx is Complete</h1>
            		<h4 className="mb-font-roboto">Congratulations! Your MinibarRx vaccine inventory selection is now complete. A MinibarRx representative will contact you within the next two business days.</h4>
				</div>
			</div>

			<div className="row content-header" style={{'marginBottom':'10px;'}}>
	          <div className="col-sm-6">
	            <p><strong>Contact</strong> – (800)777-1409</p>
	          </div>
	          <div className="col-sm-6">
	            <p><strong>Request Date</strong> – {props.reqDate}</p>
	          </div>
	        </div>	        

	        <div className="row">
	          <div className="col-12">
	            <h3 className="mb-font-roboto">Base Vaccine Selection</h3>
	          </div>
	        </div>

	        <div className="row selection">
	        	{props.defaultPrds.map((prdArr,index) => 
	        		<div key={index} className="col-sm-6">
	        			{Object.values(prdArr).map((prd,idx) => 
	        				<p key={prd.id}>-&nbsp;{prd.vaccineName}</p>
	        			)}
	        		</div>
	        	)}	          
	        </div>

	        <div className="row">
	          <div className="col-12">
	            <h3 className="mb-font-roboto">Custom Vaccine Selections</h3>
	          </div>
	        </div>
        <div className="row selection">
        	{props.vacciness.map((prdArr,index) => 
	        		<div key={index} className="col-sm-6">
	        			{Object.values(prdArr).map((prd,idx) => 
	        				<p key={prd.id}>-&nbsp;{prd.vaccineName}</p>
	        			)}
	        		</div>
	        	)}		          
	     </div>

			
	</React.Fragment>
);

export default ContentBlock; 