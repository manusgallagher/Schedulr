import React from 'react';
import ReactDOM from 'react-dom';
import ReactDrawer from 'react-drawer';


export default class Authentication extends React.Component {
	signOut() {
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          window.openAppRoute("/");
      }, function(error) {
          // An error happened.
          alert(error.message);
      });
    }
    param(name, url) {
    if (!url) {
      url = window.location.href;
    }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  render() {
    return (
    	<div>
	    	<nav className = "navbar navbar-custom" role = "navigation">
	   		   <div className = "navbar-header navBarLogoPosition">
		          <img className ="navBarLogo" src="img/logo.png" alt="logo" />
			   </div>		   
				<div className ="navbar-helpme">
					<div className = "navbar-text">
						<a onClick={this.signOut} className="btn btn-xs btn-default"><span className="glyphicon glyphicon-log-out signOutBtn"></span> Sign Out</a>
					</div>
				</div>		   
			</nav>
			<nav className="main-menu">
		          <ul>
		            <li>
		              <a href="#">
		                <i className="fa fa-home fa-2x drawerFA" />
		                <span className="nav-text">
		                  Dashboard
		                </span>
		              </a>
		            </li>
		            <li className="has-subnav">
		              <a href="#">
		                <i className="fa fa-laptop fa-2x drawerFA" />
		                <span className="nav-text">
		                  UI Components
		                </span>
		              </a>
		            </li>
		            <li className="has-subnav">
		              <a href="#">
		                <i className="fa fa-list fa-2x drawerFA" />
		                <span className="nav-text">
		                  Forms
		                </span>
		              </a>
		            </li>
		            <li className="has-subnav">
		              <a href="#">
		                <i className="fa fa-folder-open fa-2x drawerFA" />
		                <span className="nav-text">
		                  Pages
		                </span>
		              </a>
		            </li>
		            <li>
		              <a href="#">
		                <i className="fa fa-bar-chart-o fa-2x drawerFA" />
		                <span className="nav-text">
		                  Graphs and Statistics
		                </span>
		              </a>
		            </li>
		            <li>
		              <a href="#">
		                <i className="fa fa-font fa-2x drawerFA" />
		                <span className="nav-text">
		                  Typography and Icons
		                </span>
		              </a>
		            </li>
		            <li>
		              <a href="#">
		                <i className="fa fa-table fa-2x drawerFA" />
		                <span className="nav-text">
		                  Tables
		                </span>
		              </a>
		            </li>
		            <li>
		              <a href="#">
		                <i className="fa fa-map-marker fa-2x drawerFA" />
		                <span className="nav-text">
		                  Maps
		                </span>
		              </a>
		            </li>
		            <li>
		              <a href="#">
		                <i className="fa fa-info fa-2x drawerFA" />
		                <span className="nav-text">
		                  Documentation
		                </span>
		              </a>
		            </li>
		          </ul>
		          <ul className="logout">
		            <li>
		              <a href="#">
		                <i className="fa fa-power-off fa-2x drawerFA" />
		                <span className="nav-text">
		                  Logout
		                </span>
		              </a>
		            </li>  
		          </ul>
		        </nav>
			
		</div>

    );
  }
}