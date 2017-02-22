import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well } from 'react-bootstrap';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import Calendar from './holiday-calendar';

  const style = {
    well: {
      textAlign: 'center',
      width: '40%',
      height: '50%',
      position: 'fixed',
      top: '50%',
      left: '50%',
      /* bring your own prefixes */
      transform: 'translate(-50%, -50%)',
    },
  };


export default React.createClass({
  
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Well style={style.well}>          
          <Calendar  />
        </Well>         
      </div>
    );
  }
});
