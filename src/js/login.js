import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <div id="loginBodyFields" className="modal-body LoginModal">
          <p id="loginError" />
          <div className="form-group LoginInput">
            <label htmlFor="usrname"><span className="glyphicon glyphicon-user" />User name</label>
            <input type="text" className="form-control" id="loginemail" placeholder="Enter email" />
          </div>
          <div className="form-group LoginInput">
            <label htmlFor="psw"><span className="glyphicon glyphicon-eye-open" /> Password</label>
            <input type="password" className="form-control" id="loginpswd" placeholder="Enter password" />
          </div> 
          <br/>
          <button id="loginBtn" className="btn btn-default btn-success"><span className="glyphicon glyphicon-off" /> Login</button>
        </div>
        <div id="loadingLogin" className="modal-body LoginModal"></div>
        <div className="modal-footer">
          <p>Not a member? <Link to='/signup' id="signup-link">Sign Up</Link></p>
          <p>Forgot <a>Password?</a></p>
          <p><a className="signoutlink"><span className="glyphicon glyphicon-log-out" /> Sign Out</a></p>
        </div>
      </div>
    );
  }
});


