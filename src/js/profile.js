import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Button } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
      display:  'inline-block',
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
      border: 0,
      width: '100%',
    },
  };

export default React.createClass({
  getInitialState: function () {
    return {
      name: '',
      surname: '',
      address: '',
      phone: '',
      email: '',
      open: false,
      message: "",
    }
  },

  componentWillMount(){
    this.getUserDetails();
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

 handleChangeName: function (event) {
    this.setState({
      name: event.currentTarget.value,
    }, () => { // arrow function, ES2015
      console.log("name " + this.state.name);
      // call this.props.onUserInput(this.state.value)
    });
  },

  handleChangeSurname: function (event) {
    this.setState({
      surname: event.currentTarget.value,
    }, () => { // arrow function, ES2015
      console.log("surname " + this.state.surname);
      // call this.props.onUserInput(this.state.value)
    });
  },

  handleChangeAddress: function (event) {
    this.setState({
      address: event.currentTarget.value,
    }, () => { // arrow function, ES2015
      console.log("address " + this.state.address);
      // call this.props.onUserInput(this.state.value)
    });
  },

  handleChangePhone: function (event) {
    this.setState({
      phone: event.currentTarget.value,
    }, () => { // arrow function, ES2015
      console.log("phone " + this.state.phone);
      // call this.props.onUserInput(this.state.value)
    });
  },

  handleChangeEmail: function (event) {
    this.setState({
      email: event.currentTarget.value,
    }, () => { // arrow function, ES2015
      console.log("email " + this.state.email);
      // call this.props.onUserInput(this.state.value)
    });
  },

  getUserDetails: function(){
    var personID = this.param('id'); 
    if(personID.length > 0){
      new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + personID).on('value', function(snap) {
       this.setState({
          name: snap.val().Name,
          surname: snap.val().Surname,
          address: snap.val().Address,
          phone: snap.val().Phone,
          email: snap.val().Email
        });

      }.bind(this));
     }
  },

  updateDetails: function() {
    
    var personID = this.param('id');
    var tempName, tempSurname, tempAddress, tempPhone, tempEmail;
    if(personID.length > 0){

      new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + personID).on('value', function(snap) {
          tempName = snap.val().Name;
          tempSurname = snap.val().Surname;
          tempAddress = snap.val().Address;
          tempPhone = snap.val().Phone;
          tempEmail = snap.val().Email;
      });


      if(tempName != this.state.name || tempSurname != this.state.surname || tempAddress != this.state.address || tempPhone != this.state.phone ||tempEmail != this.state.email){
        firebase.database().ref('users/' + personID).update({
          Name: this.state.name,
          Surname: this.state.surname,
          Address: this.state.address,
          Phone: this.state.phone,
          Email: this.state.email
        });
        this.handleTouchTap("Information Updated Successfully");

      } else{
        this.handleTouchTap("Nothing to Update");
      }
     }
     
  },

  handleTouchTap: function(input){
    this.setState({
      open: true,
      message: input,
    });
  },

  handleRequestClose: function(){
    this.setState({
      open: false,
    });
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
              <tbody>
                <tr>
                  <td style={style.cell}><b>Name:</b></td>
                  <td style={style.cell}><input style={style.userDetails} id ="userName" type="text" onChange={ this.handleChangeName } value ={this.state.name} /></td>
                </tr>
                <tr>
                  <td style={style.cell}><b>Surname:</b></td>
                  <td style={style.cell}><input style={style.userDetails} id ="userSurname" type="text" onChange={ this.handleChangeSurname } value ={this.state.surname} /></td>
                </tr>
                <tr>
                  <td style={style.cell}><b>Address:</b></td>
                  <td style={style.cell}><textarea style={style.userDetails} id="userAddress" onChange={ this.handleChangeAddress }  rows="4" cols="22" value={this.state.address}/>
                  </td>
                </tr>
                <tr>
                  <td style={style.cell}><b>Phone Number:</b></td>
                  <td style={style.cell}><input style={style.userDetails} id ="userPhone" onChange={ this.handleChangePhone }  type="text" value ={this.state.phone} /></td>
                </tr>
                <tr>
                  <td style={style.cell}><b>Email Address:</b></td>
                  <td style={style.cell}><input style={style.userDetails} id ="userEmail" onChange={ this.handleChangeEmail }  type="text" value ={this.state.email} /></td>
                </tr>
              </tbody>
            </table>
              <Button bsStyle="primary" onClick={this.updateDetails}>Update</Button>
          </div>
        </Well>
        <MuiThemeProvider>
          <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />   
        </MuiThemeProvider>     
      </div>
    );
  }
});
