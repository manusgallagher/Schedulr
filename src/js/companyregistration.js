import React from 'react';
import ReactDOM from 'react-dom';

var CompanyRegistration = React.createClass({
  render() {
    return (
    	<div>
        	<div className="company-container">
	        {/* Modal */}
	        <div className="modal fade" id="companyModal" role="dialog">
	          <div className="modal-dialog">
	            {/* Modal content*/}
	            <div className="modal-content">
	              <div className="modal-header">
	                <img className="ModalHeader" src="img/logo.png" alt="logo" />
	              </div>
	              <div className="modal-body LoginModal">
	                <a href="#" className="btn btn-lg btn-primary createCompany"><span className="glyphicon glyphicon-plus" /> Create Company</a>{' '}
	                <a href="#" className="btn btn-lg btn-primary joinCompany"><span className="glyphicon glyphicon-cloud" /> Join Company</a>
	              </div>
	              <div className="modal-footer">
	                <p><a className="signoutlink"><span className="glyphicon glyphicon-log-out" /> Sign Out</a></p>
	              </div>
	            </div>
	          </div> 
	        </div>
	      </div>
      	</div>
    );
  }
});

ReactDOM.render(<CompanyRegistration />, document.getElementById('companyRegistration'));
