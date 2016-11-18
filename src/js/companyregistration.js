import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
  render() {
    return (
      <div>
		<div className="modal-body LoginModal">
			<a href="#" className="btn btn-lg btn-primary createCompany"><span className="glyphicon glyphicon-plus" /> Create Company</a>{' '}
			<a href="#" className="btn btn-lg btn-primary joinCompany"><span className="glyphicon glyphicon-cloud" /> Join Company</a>
		</div>
		<div className="modal-footer">
			<p><a className="signoutlink"><span className="glyphicon glyphicon-log-out" /> Sign Out</a></p>
		</div>	
      </div>
    );
  }
});
