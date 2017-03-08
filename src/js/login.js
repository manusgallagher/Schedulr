import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'

export default React.createClass({
  getInitialState: function() {
    return {
      loading: false,
    };
  },

  logIn: function() {
          var email = $("#loginemail").val();
          var pswd = $("#loginpswd").val();
          $("#loginError").hide();

          if(email.length > 0 && pswd.length){
            this.setState({
              loading: true,
            });
            var _this = this;
            firebase.auth().signInWithEmailAndPassword(email, pswd).catch(function(error) {
              $("#loginError").show().text(error.message);
              $("#loginBodyFields").show();
              _this.setState({
                loading: false,
              });
              $("#loginpswd").val("");
            });

            $("#loginBodyFields").hide();
          }else if(email.length === 0){
            $("#loginError").show().text("Please Enter an Email Address.");
          }else if(pswd.length === 0){
            $("#loginError").show().text("Please Enter a Password.");
          }

          
    },
   keyDown: function(event) {
      if(event.key==="Enter"){
        this.logIn();
      }
    },
    
  render() {
    return (
      <div>
        <div className="modal fade" id="LoginModal" role="dialog"> 
          <div className="modal-dialog"> 
            {/* Modal content */} 
            <div className="modal-content">
              <div className="modal-header">
                <img className="ModalHeader" src="img/logo.png" alt="logo" />
              </div>
                <div id="loginBodyFields" className="modal-body LoginModal">
                  <p id="loginError" />
                  <div className="form-group LoginInput">
                    <label htmlFor="usrname"><span className="glyphicon glyphicon-user" /> Email</label>
                    <input type="text" className="form-control" id="loginemail" onKeyPress={this.keyDown} placeholder="Enter email" />
                  </div>
                  <div className="form-group LoginInput">
                    <label htmlFor="psw"><span className="glyphicon glyphicon-eye-open" /> Password</label>
                    <input type="password" className="form-control" id="loginpswd" onKeyPress={this.keyDown} placeholder="Enter password" />
                  </div> 
                  <br/>
                  <button type="value" onClick={this.logIn}className="btn btn-default btn-success"><span className="glyphicon glyphicon-off" /> Login</button>
                </div>
              {this.state.loading ? 
                <div id="loadingLogin" className="modal-body LoginModal"><br /><i className="fa fa-5x fa-spinner fa-spin" /><br /></div>
              : null}
              <div className="modal-footer">
                <p>Not a member? <Link to='/signup' id="signup-link">Sign Up</Link></p>
                <p>Forgot <a>Password?</a></p>
              </div>

            </div>
          </div>
        </div>        
      </div>
    );
  }
});


