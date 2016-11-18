import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import Login from './login'
import Signup from './signup'
import CompanyRegistration from './companyregistration'
import AddUserDetails from './adduserdetails'
import NavBar from './navigation'


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

/* AUTHENTICATION CODE.
 * Migrating to here from Index.js.
 * Easier Maintained and Guranteed to work.
 */
$("#loginBtn").click(
    function(){
        /*var spinner = '<br /><i class="fa fa-5x fa-spinner fa-spin" /><br />';
        $('#loginBodyFields').hide();
        $('#loadingLogin').append(spinner);*/
        var url = window.location.href;
        var lastSegment = url.split('/');
        var newUrl = "http://";
        
        for(var i=1; i<lastSegment.length-1; i++){
            if(lastSegment[i]!=""){
              newUrl+=lastSegment[i]+'/';
            }

        }
        newUrl+='adduserdetails'
        window.location.href = newUrl;
    }
);

$("#signupBtn").click(
    function(){
        var spinner = '<br /><i class="fa fa-5x fa-spinner fa-spin" /><br />';
        $('#signUpBodyFields').hide();
        $('#loadingSignUp').show().append(spinner);
    }
);

