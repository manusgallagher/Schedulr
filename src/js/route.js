import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import Login from './login'
import Signup from './signup'
import CompanyRegistration from './companyregistration'
import AddUserDetails from './adduserdetails'
import NavBar from './navigation'

/* 
 * ROUTE RENDERING CODE.
 */

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/companyregistration" component={CompanyRegistration}/>
    <Route path="/adduserdetails" component={AddUserDetails}/>
    <Route path="/home"/>
  </Router>
), document.getElementById("app"))

ReactDOM.render((
  <Router history={hashHistory}>
  	<Route path="/"/>
  	<Route path="/signup"/>
    <Route path="/companyregistration"/>
    <Route path="/adduserdetails"/>
    <Route path="/home" component={NavBar}/>
  </Router>
), document.getElementById("navigation"))

const openAppRoute = (route) => {
  // Helper function to navigation to a different route programmatically.
  hashHistory.push(route);
};
window.openAppRoute = openAppRoute;


/* PAGE SETUP CODE.
 * Migrated from Index.js.
 */

$(document).ready(function () {
    pageSetup();             
});

$(window).on('hashchange', pageSetup);

function pageSetup(){
    var url = window.location.href;
    var lastSegment = url.split('/').pop();

    if (lastSegment == "home"){
        $('#AuthenticationModal').modal("hide");
    }else{
         $('#AuthenticationModal').modal({
          backdrop: 'static',
          keyboard: false
        });
    }
}

/* AUTHENTICATION CODE.
 * Migrated from Index.js.
 * Easier Maintained and Guranteed to work.
 */
var globalUser = "";
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("Logged in");
        globalUser = user;

        new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + user.uid).once('value', function(snap) {
            if (snap.val() == null) {
              //--Closing Signup and Login Modals--
              console.log("You Need to Add User Details...");
              window.openAppRoute("/adduserdetails");
            }else{
              console.log("You Don't Need to Add User Details...");
              if(snap.val().EmployeeOf || snap.val().EmployerOf){
                 window.openAppRoute("/home");
              }else{
                console.log("Whatchu talking bout Willis?");
              }
            }
        });
    } else {
        console.log("Not Logged in");
    }
});
