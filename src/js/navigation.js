import React from 'react';
import ReactDOM from 'react-dom';
import ReactDrawer from 'react-drawer';


export default class Authentication extends React.Component {
	constructor() {
	    super();
	    this.state = {
	      open: false,
	      position: 'left',
	      noOverlay: false,     
	    };
	    this.toggleDrawer = this.toggleDrawer.bind(this);
	    this.closeDrawer = this.closeDrawer.bind(this);
	    this.onDrawerClose = this.onDrawerClose.bind(this);
	    this.setPosition = this.setPosition.bind(this);
	    this.setNoOverlay = this.setNoOverlay.bind(this);
	  }

  setPosition(e) {
    this.setState({position: e.target.value});
  }
  setNoOverlay(e) {
    this.setState({noOverlay: e.target.checked});
  }
  toggleDrawer() {
    this.setState({open: !this.state.open});
  }
  closeDrawer() {
    this.setState({open: false});
  }
  onDrawerClose() {
    this.setState({open: false});
  }
  signOut() {
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          window.openAppRoute("/");
      }, function(error) {
          // An error happened.
          alert(error.message);
      });
    }
  render() {
    return (
    	<div>
	    	<nav className = "navbar navbar-custom" role = "navigation">
	   		   <div className = "navbar-header navBarLogoPosition">
			      <button
		            onClick={this.toggleDrawer}
		            disabled={this.state.open && !this.state.noOverlay}
		            className="drawerBtn"
		            >
		            {<i className ="fa fa-bars"></i>}
		          </button><img className ="navBarLogo" src="img/logo.png" alt="logo" />
			   </div>		   
			   <div className ="navbar-helpme">
			      <p className = "navbar-text">
			        Hi Manus{' '}
			     	<a onClick={this.signOut} className="btn btn-xs btn-default"><span className="glyphicon glyphicon-log-out signOutBtn"></span> Sign Out</a>
			     </p>
			   </div>		   
			</nav>
			<div>
		        <div style={{margin: 200}}>
		        </div>
		        <ReactDrawer
		          open={this.state.open}
		          position={this.state.position}
		          onClose={this.onDrawerClose}
		          noOverlay={this.state.noOverlay}
		          className='NavBarThing'>
		          <i onClick={this.closeDrawer} className="icono-cross"></i>
		          <div className="nav-drawer">
		          	<img className ="navDrawerLogo" src="img/logo.png" alt="logo" />
		            <br/>
		          	<div className="nav-drawer-links">	
						<p><a className="nav-drawer-item active"><i className="fa fa-home"></i> Home</a></p>
						<p><a className="nav-drawer-item"><i className="fa fa-calendar"></i> Rota</a></p>
						<p><a className="nav-drawer-item"><i className="fa fa-pencil"></i> Holidays</a></p>
						<p><a id="profileLink" className="nav-drawer-item"><i className="fa fa-user"></i> Profile</a></p>
					</div> 
		          </div>
		        </ReactDrawer>
		      </div>
		</div>
    );
  }
}