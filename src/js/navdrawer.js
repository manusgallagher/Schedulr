import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';

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
                      Holidays
                    </span>
                  </Link>
                </li>                
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
  

