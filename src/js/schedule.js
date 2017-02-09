import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import ReactFire from 'reactfire';
import Firebase from 'firebase';


export default React.createClass({
	componentWillMount: function() {
	    var firebaseRef = firebase.database().ref('testing/person');
	  },

	render() {
		return (
			<p>Gotta get that</p>
		);
	}
});
