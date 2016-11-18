import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'


export default React.createClass({
  render() {
    return (
     	<div>
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
	          <div id="loadingSignUp" className="modal-body LoginModal"></div>
	          <div className="modal-footer">
	            <p>Have an Account? <Link to='/' id="login-link">Log In</Link></p>
	          </div>
      	</div>
    );
  }
});

