import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'


export default React.createClass({
  signUp: function() {
  		var email = $("#signupemail").val();
        var password = $("#signuppsw").val();
        var confPass = password; //$("#confpsw").val();

        if (confPass != password) {
            $("#signUpError").show().text("Passwords Don't Match");
            $("#confpsw").val("");
        } else if (email == "") {
            $("#signUpError").show().text("Fill in All Required Fields");
        } else if (confPass == "" || password == "") {
            $("#signUpError").show().text("Fill in All Required Fields");
        } else {

	        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	            $("#signUpError").show().text(error.message);
	            $("#signUpBodyFields").show();
	        	$("#loadingSignUp").hide();
	        });
	    }

	       $('#signUpBodyFields').hide();
	       $('#loadingSignUp').show().append('<br /><i class="fa fa-5x fa-spinner fa-spin" /><br />');
    },
  render() {
    return (
     	<div>
     		<div className="modal fade" id="SignupModal" role="dialog"> 
	        <div className="modal-dialog"> 
	          {/* Modal content */} 
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
		            <button type="submit" onClick={this.signUp} className="btn btn-default btn-success"><span className="glyphicon glyphicon-off" /> Create</button>
		          </div>
		          <div id="loadingSignUp" className="modal-body LoginModal"></div>
		          <div className="modal-footer">
		            <p>Have an Account? <Link to='/' id="login-link">Log In</Link></p>
		          </div>
	            
	          </div>
	        </div>
	      </div>
      	</div>
    );
  }
});

