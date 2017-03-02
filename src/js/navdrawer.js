import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

export default React.createClass({
  getInitialState: function () {
    return {
      userType: '',
    }
  },

  componentWillMount(){
    //Get user type:
    this.employeeRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/users/'+this.param('id'));
    this.employeeRef.on("value", function(dataSnapshot) {
      var userType = '';

      if(dataSnapshot.val().EmployerOf){
        userType = "Employer";
      }else{
        userType = "Employee";
      }

      this.setState({
        userType: userType,
      });
      
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


  getLink: function(page){
    return "/"+page+"?id="+this.param('id')+"&company=" + this.param('company');
  },

  render() {
    return (
      <div>
        <nav className="main-menu">
              <ul>
                
                <li>
                  <Link to={this.getLink('home')}>
                    <FontAwesome
                      name='home'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={this.getLink('rota')}>
                    <FontAwesome
                      name='calendar-o'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Rota
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to={this.getLink('holidays')}>
                    <FontAwesome
                      name='pencil'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Request Holidays
                    </span>
                  </Link>
                </li> 
                {this.state.userType==='Employer' ?
                <li>
                  <Link to={this.getLink('admin')}>
                    <FontAwesome
                      name='users'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Admin
                    </span>
                  </Link>
                </li> : null } 

              </ul>
              <ul className="logout">
                <li>
                  <Link to={this.getLink('profile')}>
                    <FontAwesome
                      name='user'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Profile
                    </span>
                  </Link>
                </li>  
              </ul>
            </nav>
      </div>
    );
  }
});
  

