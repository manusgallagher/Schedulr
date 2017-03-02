import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const styles = {
  button: {
    margin: 12,
  },
  welcome: {
    color: 'white',
    fontSize: '120%',
  },
  notifications:{
      textAlign: 'center',
      width: '100%',
      backgroundColor: 'red',
      color: 'white',
    },
};

const signOut = () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.openAppRoute("/");
    }, function(error) {
        // An error happened.
        alert(error.message);
    });
  }


export default React.createClass({
  getInitialState: function () {
    return {
      name: "",
    }
  },
  componentWillMount(){
     var employeeRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/users/'+this.param("id"));
      employeeRef.on("value", function(dataSnapshot) {

        this.setState({ name: dataSnapshot.val().Name, });

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

  render() {

    return (
      <div> 
        <AppBar
            showMenuIconButton={false}
            title={<img src={"img/logo-nav.png"}/> }
            iconElementRight={
                <div>
                  {this.state.name.length !=0 ? <span style={styles.welcome}>Hi {this.state.name}</span> : null }
                  <RaisedButton 
                    onClick={signOut} 
                    label="Sign Out" 
                    primary={true} 
                    style={styles.button}         
                    icon={ 
                        <FontAwesome 
                          className='super-crazy-colors' 
                          name='sign-out' 
                          style={{ color: '#B71C1C' }}
                        />
                      }
                  />
                </div>
            }
          />
      </div>
    );
  }
});