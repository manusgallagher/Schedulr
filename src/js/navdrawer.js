import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

export default class Drawer extends React.Component {


  render() {
    return (
      <div>
        <nav className="main-menu">
              <ul>
                
                <li>
                  <a href="#">
                    <FontAwesome
                      name='home'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Home
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesome
                      name='calendar-o'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Rota
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesome
                      name='pencil'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Holidays
                    </span>
                  </a>
                </li>                
              </ul>
              <ul className="logout">
                <li>
                  <a href="#">
                    <FontAwesome
                      name='user'
                      className="drawerFA"
                    />
                    <span className="nav-text">
                      Profile
                    </span>
                  </a>
                </li>  
              </ul>
            </nav>
      </div>
    );
  }
}
