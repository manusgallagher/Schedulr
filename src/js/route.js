import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import Login from './login'
import Signup from './signup'
import CompanyRegistration from './companyregistration'
import AddUserDetails from './adduserdetails'
import NavBar from './navigation'
import Welcome from './welcome'
import Rota from './rota'
import Holidays from './holidays'
import Profile from './profile'
import Admin from './admin'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var ReactGA = require('react-ga');
ReactGA.initialize('UA-43242176-2');

/* 
 * ROUTE RENDERING CODE.
 */
ReactDOM.render((
  <Router history={hashHistory} onUpdate={logPageView}>
    <Route path="/" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/companyregistration" component={CompanyRegistration}/>
    <Route path="/adduserdetails" component={AddUserDetails}/>
    <Route component={Welcome}>
      <Route path="/home" component={NavBar} />
    </Route>
    <Route component={Rota}>
      <Route path="/rota" component={NavBar} />
    </Route>
    <Route component={Holidays}>
      <Route path="/holidays" component={NavBar} />
    </Route>
    <Route component={Admin}>
      <Route path="/admin" component={NavBar} />
    </Route>
    <Route component={Profile}>
      <Route path="/profile" component={NavBar} />
    </Route>
  </Router>
), document.getElementById("app"))

const openAppRoute = (route) => {
  // Helper function to navigation to a different route programmatically.
  hashHistory.push(route);
};
window.openAppRoute = openAppRoute;

function logPageView() {
  var url = window.location.href;
  var lastSegment = url.split('/').pop();
  var newAddress = "";

  for(var i in lastSegment){
    if(lastSegment[i]==="?"){
      break;
    }else{
      newAddress+=(lastSegment[i]);
    }
  }
  newAddress = "/"+newAddress;

  ReactGA.set({ page: newAddress });
  ReactGA.pageview(newAddress);
}

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

    if (lastSegment.substring(0,4) == "home"){

      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();


    }else if(lastSegment.substring(0,6) == "signup"){
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();

      $('#SignupModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }else if(lastSegment.substring(0,19) == "companyregistration"){
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();

      $('#CompanyRegistrationModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }else if(lastSegment.substring(0,14) == "adduserdetails"){
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();

      $('#AddUserModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }else{
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();

      $('#LoginModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
}

/* AUTHENTICATION CODE.
 * Migrated from Index.js.
 * Easier Maintained and Guranteed to work.
 */

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("Logged In");      
        
        new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + user.uid).once('value', function(snap) {
            if (snap.val() == null) {
              console.log("You Need to Add User Details...");
              var newUrl =encodeURI("/adduserdetails?id="+user.uid+"&user="+user.email);
              window.openAppRoute(newUrl);
            }else{
              /*You Don't Need to Add User Details...*/
              if(snap.val().EmployeeOf){
                var companyid = snap.val().EmployeeOf.UniqueID;
                var newUrl =encodeURI("/home?id="+user.uid+"&company="+companyid);

                window.openAppRoute(newUrl);
              

              }else if(snap.val().EmployerOf){
                var companyid = snap.val().EmployerOf.UniqueID;
                var newUrl =encodeURI("/admin?id="+user.uid+"&company="+companyid); //CHANGED CODE HERE FOR CONVENIENCE
                
                window.openAppRoute(newUrl);
              }else{
                /*Create a company / Join a company*/
                var newUrl =encodeURI("/companyregistration?user="+user.uid);
                window.openAppRoute(newUrl);
              }
            }
        });
    } else {
        console.log("Not Logged in");
    }
});