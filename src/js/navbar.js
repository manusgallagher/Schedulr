import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';
import DrawerSimpleExample from './navdrawer';

const styles = {
  button: {
    margin: 12,
  }
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

const NavBar = () => (
  <div>
    <AppBar
        showMenuIconButton={false}
        title={<img src={"img/logo-nav.png"}/>}
        iconElementRight={
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
        }
      />     
  </div>
);

export default NavBar