
import React from 'react';
import ReactDOM from 'react-dom';
import {grey800, grey400, red900} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NavBar from './navbar';
import Drawer from './navdrawer';

const muiTheme = getMuiTheme({
  appBar: {
  	color: grey800,
    height: 55,
  },
  raisedButton: {
      primaryColor: grey400,
      primaryTextColor: red900,
   },
});


export default class Authentication extends React.Component {
  render() {
    return (
		  <MuiThemeProvider muiTheme={muiTheme}>
			<div>
				<NavBar />
				<Drawer />
			</div>
		</MuiThemeProvider>
    );
  }
}