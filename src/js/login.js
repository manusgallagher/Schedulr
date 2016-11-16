import React from 'react';
import ReactDOM from 'react-dom';

var Signup = require('./signup');
var UserDetails = require('./adduserdetails');
var CompanyRegistration = require('./companyregistration');
var NavBar = require('./navigation');


var Login = React.createClass({
  render() {
    return (
    	<div className="login-container">
        {/* Modal */}
        <div className="modal fade" id="loginModal" role="dialog">
          <div className="modal-dialog">
            {/* Modal content*/}
            <div className="modal-content">
              <div className="modal-header">
                <img className="ModalHeader" src="img/logo.png" alt="logo" />
              </div>
              <div id="loginBodyFields" className="modal-body LoginModal">
                <p id="loginError" />
                <div className="form-group LoginInput">
                  <label htmlFor="usrname"><span className="glyphicon glyphicon-user" />Username</label>
                  <input type="text" className="form-control" id="loginemail" placeholder="Enter email" />
                </div>
                <div className="form-group LoginInput">
                  <label htmlFor="psw"><span className="glyphicon glyphicon-eye-open" /> Password</label>
                  <input type="password" className="form-control" id="loginpswd" placeholder="Enter password" />
                </div> 
                <br/>
                <button id="loginBtn" className="btn btn-default btn-success"><span className="glyphicon glyphicon-off" /> Login</button>
              </div>
              <div id="loadingLogin" className="modal-body LoginModal">
                <br />
                <i className="fa fa-5x fa-spinner fa-spin" />
                <br />
              </div>
              <div className="modal-footer">
                <p>Not a member? <a id="signup-link">Sign Up</a></p>
                <p>Forgot <a>Password?</a></p>
                <p><a className="signoutlink"><span className="glyphicon glyphicon-log-out" /> Sign Out</a></p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  }
});

ReactDOM.render(<Login />, document.getElementById('loginForm'));
