import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

  

export default React.createClass({
  getInitialState: function () {
    return {
      userType: '',
    }
  },

  componentWillMount(){
    //Get user type:
    this.employeeRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/users/'+this.param('id'));
    this.employeeRef.on("value", function(dataSnapshot) {
      var userType = '';

      if(dataSnapshot.val().EmployerOf){
        userType = "Employer";
      }else{
        userType = "Employee";
      }

      this.setState({
        userType: userType,
      });
      
    }.bind(this));
  },
  param: function(name, url) {
    if (!url) {
      url = window.location.href;
    }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    getLink: function(page){
    return "/"+page+"?id="+this.param('id')+"&company=" + this.param('company');
  },


  render() {
    return (
      <div>
        <div>{this.props.children}</div>
          <div id="appPosition">
            {this.state.userType==='Employee' ?
              <Well>
                <p>This is your admin page</p>
              </Well>
            : 

              <Well id="incorrectPermissions">
                <h1>Error 403</h1>
                <h3>You do not have permission <FontAwesome name='hand-paper-o '/> </h3> 
                <br/>
                <p>Please navigate back to <Link to={this.getLink('home')}>home</Link>.</p>
              </Well>
          } 
          <div id="footer"/>   
        </div>
      </div>

    );
  }
});
