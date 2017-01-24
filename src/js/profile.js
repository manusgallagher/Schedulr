import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Button } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

  const style = {
    well: {
      textAlign: 'center',
      width: '60%',
      height: '70%',
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
    },
    profile: {
      textAlign: 'left',
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '3%',
      fontSize: '110%',
    },
    cell:{
      verticalAlign: 'top',
      paddingTop: '.60em',
      paddingBottom: '.60em',
    },
    buttonRow:{
      backgroundColor: 'red'
    },
    userContent:{
      paddingTop: '1%',
      textAlign: 'center',
      width: '50%',
      float: 'right',
    },
    profilepic:{
      float: 'left',
      textAlign: 'center',
      width: '50%',
    },
    image:{
      width: '150px',
    },
    userDetails:{
      width: '20em',
    }
  };


export default React.createClass({
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
    var latestSnapshot = null;

    if(companyID.length > 0){
      new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + companyID).on('value', function(snap) {
        latestSnapshot = snap.val().Name; 
      });
     }

      return latestSnapshot;
  },

  getUserDetails: function(detail){
    var returnDetail = "";
    if(detail=='name'){
      returnDetail = "Manus Gallagher";
    }else if(detail=='address'){
      returnDetail = "32 Chestnut Grove,\
                  Glencar,\
                  Letterkenny,\
                  \
                  Co. Donegal.";
    }else if(detail=='phone'){
      returnDetail = "0872178736";
    }
    else if(detail=='email'){
      returnDetail = "gallagher.manus@gmail.com";
    }

    return returnDetail;
  },


  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Well style={style.well}>
          <div style={style.profilepic}>
            <img style={style.image} src ="img/profilepic.jpg" />
            <br/>
            <a>Upload New Profile Picture</a>
          </div>
          <div style={style.userContent}>
            <table style={style.profile}>
              <tr>
                <td style={style.cell}><b>Name:</b></td>
                <td style={style.cell}><input className="userDetails" id ="userName" type="text" value ={this.getUserDetails('name')} /></td>
              </tr>
              <tr>
                <td style={style.cell}><b>Address:</b></td>
                <td style={style.cell}><textarea className="userDetails" id="userAddress" rows="4" cols="22" value={this.getUserDetails('address')}/>
                </td>
              </tr>
              <tr>
                <td style={style.cell}><b>Phone Number:</b></td>
                <td style={style.cell}><input className="userDetails" id ="userPhone" type="text" value ={this.getUserDetails('phone')} /></td>
              </tr>
              <tr>
                <td style={style.cell}><b>Email Address:</b></td>
                <td style={style.cell}><input className="userDetails" id ="userEmail" type="text" value ={this.getUserDetails('email')} /></td>
              </tr>
            </table>
              <Button bsStyle="primary">Update</Button>
          </div>
        </Well>         
      </div>
    );
  }
});
