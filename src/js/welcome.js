import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Admin from './admin'

  const style = {
    name: {
      color: '#B71C1C',
      fontWeight: 'bold',
    },
    welcomeText: {
      display: 'inline-block',
      textAlign: 'left',
      fontSize: '120%',
    },

    tableCells:{
      fontWeight: 'bold',
      marginRight: '1%',
      width: '4.5%',
      textAlign: 'center',
      padding: '0',
    },

    tableCellsTimes:{
      fontWeight: 'bold',
      marginRight: '1%',
      width: '10%',
      textAlign: 'right',
      padding: '0',
    },

    availButton:{
      margin: '0 auto',
    },
  };

  function param(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';

      return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

var uniqueTimes = [];
var RowHeaders = React.createClass({

  render: function() {
    var _this = this;
    var createHeader = function(item, index) {
        return (<div key={index} className="col-sm-1" style={style.tableCells}>{item}</div>);
    }
    var times = [];

    for(var i in this.props.data){
      var dayAvailabilities = this.props.data[i];

      for(var key in dayAvailabilities){
        times.push(key);
      } 
    }

    uniqueTimes = [];
    $.each(times, function(i, el){
        if($.inArray(el, uniqueTimes) === -1) uniqueTimes.push(el);
    });

    return (<div className="row">
              <div className="col-sm-1" style={style.tableCellsTimes}>
              </div>
              {uniqueTimes.map(createHeader)}
            </div>);
  }
});

var AvailabilityRow = React.createClass({

  render: function() {
    var _this = this;
    var createRow = function(item, index) {


        var changeState = function(row, index, status){
          var obj ={};
          obj[uniqueTimes[index]]=status;
          new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + param('company') + '/Employees/' + param('id')+'/availabilities/'+row).update(obj);
        }

        var row = _this.props.row;

        if(typeof(item)==='string'){
          return (<div key={index} className="col-sm-1" style={style.tableCells}></div>);
        }else if(item===true){
          return (<div key={index} className="col-sm-1" style={style.tableCells}><a onClick={changeState.bind(null, row, index, false)} className="availabilityCheckSquare"><FontAwesome name='check-square-o' /></a> </div>);
        }else{
          return (<div key={index} className="col-sm-1" style={style.tableCells}><a onClick={changeState.bind(null, row, index, true)} className="availabilityCheckSquare"><FontAwesome name='square-o' /></a></div>);
        }
        
    }
    var status = [];
    for(var i in uniqueTimes){
      var val = "";
      for(var key in this.props.data){
        if(key===uniqueTimes[i]){
          val = this.props.data[key];
        }
      }
      if(val!=null){
        status.push(val);
      }else{
        status.push("No");
      }
    }

    console.log(_this.props.row);
    

    return (<div className="row">
              <div className="col-sm-1" style={style.tableCellsTimes}>{this.props.day}</div>
                {status.map(createRow)}
            </div>);
  }
});

export default React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      companyName: "",
      availabilities: [],
      requirements: [],
      availabilities: [],
    }
  },
  componentWillMount(){
      this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/ShiftRequirements"), "requirements");
      this.bindAsArray(new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + param('company') + '/Employees/' + param('id')+'/availabilities'), "availabilities");
  
      this.shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + param('company')).once('value', function(snap) {
        this.setState({companyName: snap.val().Name,}) 
      }.bind(this));
      
    
  },


  render() {
    /*
     * CODE USED TO ASSIGN AVAILABILITIES
     *
     */ 
        this.employeeAvailabilityRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + param('company') + '/Employees/' + param('id')).once('value', function(snap) {
          if(snap.val().availabilities){
            //console.log(snap.val().availabilities[0]);
          }else{
            var availabilitiesArr = [];
            

            for(var day=0; day<7; day++){
              var obj = {};
              var dailyAvailabilitiesArr =[];
              var dayShifts = this.state.requirements[day];

              for(var i in dayShifts){
                if(dayShifts[i]!='No'){
                  obj[i] = false;
                }
                  
              } 
              new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + param('company') + '/Employees/' + param('id')+"/availabilities/"+day).update(obj);
                   
            }
             
          }
        }.bind(this));
        
    
        /**/
    return (
      <div>
        <div>{this.props.children}</div>
        <div id="appPosition">
        { this.state.companyName.length != 0 ?
        <div>
          <div className="col-sm-3">
            <div className="well" id="welcomeWell">
                <div id = "welcomeMessage">
                  Welcome to <span id="compName" style={style.name}>{this.state.companyName}</span>.
                  <br/>
                  <br/>
                  **Insert Content Here**
                </div>
            </div>  
          </div>
            <div className="col-sm-9">
            
              <div className="well" id="availibilitesWell">
                <legend><h4>Save Your Weekly Availabilities:</h4></legend>
                <RowHeaders data={this.state.availabilities} />
                <AvailabilityRow data={this.state.availabilities[0]} row={0} day={"Monday"} />
                <AvailabilityRow data={this.state.availabilities[1]} row={1} day={"Tuesday"} />
                <AvailabilityRow data={this.state.availabilities[2]} row={2} day={"Wednesday"} />
                <AvailabilityRow data={this.state.availabilities[3]} row={3} day={"Thursday"} />
                <AvailabilityRow data={this.state.availabilities[4]} row={4} day={"Friday"} />
                <AvailabilityRow data={this.state.availabilities[5]} row={5} day={"Saturday"} />
                <AvailabilityRow data={this.state.availabilities[6]} row={6} day={"Sunday"} />
              </div> 
            </div> 
          </div> : <div className="loadingSpinner">
                          <FontAwesome
                              name='spinner'
                              spin
                            /> 
                        </div>}

          </div>
          <div id="footer"/>    
      </div>

    );
  }
});
