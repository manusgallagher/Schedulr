import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well } from 'react-bootstrap';

  const style = {
    welcomeWell: {
      textAlign: 'center',
      width: '40%',
      height: '50%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      /* bring your own prefixes */
      transform: 'translate(-50%, -50%)',
    },
    image: {
      width: '40%',
    },
    name: {
      color: '#B71C1C',
      fontWeight: 'bold',
    },
    welcomeText: {
      display: 'inline-block',
      textAlign: 'left',
      fontSize: '120%',
    }
  };

var companyName = "";
export default React.createClass({
  componentWillMount(){
    this.getCompanyName();
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

  getCompanyName: function(){
    var companyID = this.param('company');

    if(companyID.length > 0){
      new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + companyID).on('value', function(snap) {
        companyName = snap.val().Name; 
      });
     }
  },


  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Well style={style.welcomeWell}>
          <img src = "/img/logo-nav.png" style={style.image} />
           <br/>
           <br/>
           <div id = "welcomeMessage" style={style.welcomeText}>
            Welcome to <span id="compName" style={style.name}>{companyName}</span>.
            <br/>
            <br/>
            This is your Company Space;
            <br/>
            Here you will be assigned hours by your 
            <br/>
            Employer and you will be to request for
            <br/>
            days off.
          </div>
        </Well>         
      </div>
    );
  }
});

