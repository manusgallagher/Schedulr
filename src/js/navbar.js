import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';
import DrawerSimpleExample from './navdrawer';

const styles = {
  button: {
    margin: 12,
  },
  welcome: {
    color: 'white',
    fontSize: '120%',
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

  getName: function(){
    var personID = this.param('id'); 
    var latestSnapshot = null;

    if(personID.length > 0){
      new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + personID).on('value', function(snap) {
        latestSnapshot = snap.val().Name; 
      });
     }

      return latestSnapshot;
  },



  render() {
    return (
      <div>
        <AppBar
            showMenuIconButton={false}
            title={<img src={"img/logo-nav.png"}/>}
            iconElementRight={
                <div>
                <span style={styles.welcome}> Hi {this.getName()} </span>
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