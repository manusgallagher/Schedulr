import React from 'react';
import ReactDOM from 'react-dom';

var Signup = React.createClass({
  render() {
    return (
    	<div>
        	<div className="signup-container">
	        {/* Modal */}
	        <div className="modal fade" id="signupModal" role="dialog">
	          <div className="modal-dialog">
	            {/* Modal content*/}
	            <div className="modal-content">
	              <div className="modal-header">
	                <img className="ModalHeader" src="img/logo.png" alt="logo" />
	              </div>
	              <div id="signUpBodyFields" className="modal-body LoginModal">
	                <p id="signUpError" />
	                <div className="form-group LoginInput">
	                  <label htmlFor="usrname"><span className="glyphicon glyphicon-user" /> Username</label>
	                  <input type="text" className="form-control" id="signupemail" placeholder="Enter email" />
	                </div>
	                <div className="form-group LoginInput">
	                  <label htmlFor="psw"><span className="glyphicon glyphicon-eye-open" /> Password</label>
	                  <input type="password" className="form-control" id="signuppsw" placeholder="Enter password" /><br />
	                  <input type="password" className="form-control" id="confpsw" placeholder="Confirm password" />
	                </div>
	                <br />
	                <button type="submit" id="signupBtn" className="btn btn-default btn-success"><span className="glyphicon glyphicon-off" /> Create</button>
	              </div>
	              <div id="loadingSignUp" className="modal-body LoginModal">
	                <br />
	                <i className="fa fa-4x fa-spinner fa-spin" />
	                <br />
	              </div>
	              <div className="modal-footer">
	                <p>Have an Account? <a id="login-link">Log In</a></p>
	              </div>
	            </div>
	          </div>
	        </div> 
	      </div>
      	</div>
    );
  }
});

ReactDOM.render(<Signup />, document.getElementById('signUpForm'));
