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
  getInitialState: function () {
    return {
      month:  moment().month(),
      year:   moment().year(),
    }
  },
  componentWillMount(){
    var year = this.state.year;
    var month = this.state.month;
    var numOfDays = moment([year, month]).daysInMonth(); //IMPORTANT
  },
  changeMonthDec: function(){
    var year = this.state.year;
    var month = this.state.month;

    if(month===0){
      month=11;
      year-=1;
    }else{
      month-=1;
    }
    
    var tempMonth = moment([year, month]).month();
    var tempYear = moment([year, month]).year();

    this.setState({
      month:tempMonth,
      year: tempYear,
    });
  },
  changeMonthInc: function(){
    var year = this.state.year;
    var month = this.state.month;

    if(month===11){
      month=0;
      year+=1;
    }else{
      month+=1;
    }
    
    var tempMonth = moment([year, month]).month();
    var tempYear = moment([year, month]).year();

    this.setState({
      month:tempMonth,
      year: tempYear,
    });
  },
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Well style={style.well}>
          <div style={style.weekValue}>
            <h3><a style={style.weekButton} onClick={this.changeMonthDec}><FontAwesome name='arrow-left' /></a>
              {moment.months(this.state.month) +" - " + this.state.year}
            <a style={style.weekButton} onClick={this.changeMonthInc}><FontAwesome name='arrow-right' /></a></h3>
            <div id="daysOfMonth">
              <p>This is where the cells for the month will go</p>
              <Calendar month={this.state.month} year={this.state.year} />
            </div>
          </div> 
        </Well>         
      </div>
    );
  }
});
