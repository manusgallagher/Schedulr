import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Modal, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import { Table } from 'react-bootstrap';

/*
 * CODE USED TO AUTO ADD DATES TO FIREBASE
 *
 *

var year = 2017;
var date = moment().year(year);
var hours = ['900','1000','1100','1200','1300','1400'];


var count  = 0;
var weeks = (moment(year, "YYYY").weeksInYear());

for(var week=1; week<=weeks; week++){
  //console.log(week);
  var count  = 0; 
  for(var day=0; day<7; day++){
    
    var date = moment(year, "YYYY").day(day).week(week);
    for(var i in hours){
      var shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/shifts/'+param('company')+'/'+year+'/'+week+'/'+count+'/'+date.format("DD-MM"));
      shiftRef.set({  '900' :'Unassigned',
                      '1000':'Unassigned',
                      '1100':'Unassigned',
                      '1200':'Unassigned',
                      '1300':'Unassigned',
                      '1400':'Unassigned',
                      '1500':'Unassigned',
                      '1600':'Unassigned',
                      '1700':'Unassigned',
                      '1800':'Unassigned',
                      '1900':'Unassigned',
                      '2000':'Unassigned',
                      '2100':'Unassigned'});

    }
    count++;
  }
}/**/
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

var shiftDates = [];
var shiftTimes = [];
var shiftsToAssign = [];

var ShiftRow = React.createClass({

  render: function() {
    var _this = this;
    var createCell = function(item, index) {

      var cellClicked = function(row, column, cellID){
        var date = shiftDates[row];
        var time = shiftTimes[column];
        var content = $('#message-'+cellID).html();
        if(content==="Unassigned"){
          $('#message-'+cellID).html("Assinging");
          $("#"+cellID).removeClass("unassigned");
          $("#"+cellID).addClass("assigning");


          var obj = {};
          obj[date]=time;
          shiftsToAssign.push(obj);
        } else if (content==="Assinging"){

          $('#message-'+cellID).html("Unassigned");
          $("#"+cellID).addClass("unassigned");
          $("#"+cellID).removeClass("assigning");

          if(shiftsToAssign.length===1){
            shiftsToAssign = [];
          } else {
            var posToRemove = -1;

            for(var i in shiftsToAssign){
              
             for(var key in shiftsToAssign[i]){
                if(key === date && shiftsToAssign[i][key]===time){
                  posToRemove = i;
                }
             }
            }
            shiftsToAssign.splice(posToRemove,1);
          }
        } 
        if(shiftsToAssign.length>0){
          _this.props.changeDropdownStatus(true);
        }else{
          _this.props.changeDropdownStatus(false);
        }

        console.log(shiftsToAssign);
      }

      var row =  _this.props.row;
      var column = index;

      var cellID ="r"+row+"c"+column;

      if(item==='Unassigned'){
        return (              
        <button id={cellID} key={index} onClick={cellClicked.bind(null, row, column, cellID)} className={'time-slot unassigned'}> 
          <span id={'message-'+cellID}>{item}</span> 
        </button> 
          )
      }else{
        return (
        <button id={cellID} key={index} onClick={cellClicked.bind(null, row, column, cellID)} className={'time-slot assigned'}> 
          <span id={'message-'+cellID}>{item}</span> 
        </button> 
        )
      }
    }
    
    var shiftsAssigned = [];
    var weeklyShifts = [];
    if(this.props.shifts[this.props.weekVal]){
      weeklyShifts = this.props.shifts[this.props.weekVal][this.props.row];
   }
   
    for(var dates in weeklyShifts){
        if(dates!=".key"){
          shiftDates.push(dates);
          var shifts = weeklyShifts[dates];
        
          for(var times in shifts){
            shiftsAssigned.push(shifts[times]);
            shiftTimes.push(times);
          }
      }
    }

    return <div className="rotaRow"><button className="time-slot">{this.props.date}</button>{shiftsAssigned.map(createCell)}</div>;
  }
});

var Rota = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      weekVal: 9,
      shifts: [],
      employeeToAssign: "",
      companyEmployees: [],
      showDropDown: false,
    };
  },

  componentWillMount: function() {
    
    this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/shifts/"+param('company')+"/2017/"), "shifts");
    
    /*
     * Populating Object with Employee ID's and Names.
     */
    this.companyRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+param('company'));
    this.companyRef.once("value", function(companySnapshot) {
      var employees = companySnapshot.val().Employees;
      var employeeIDsAndNames = {};
      for(var id in employees){

        var fullName = employees[id].Name;
        var name = "";

        for(var j =0; j<fullName.length; j++){
          if(fullName.charAt(j)!=' '){
            name += fullName.charAt(j);
          }else{
            break;
          }                       
        }           

        employeeIDsAndNames[id] = name;

      }
      this.setState({
        companyEmployees: employeeIDsAndNames,
      });

    }.bind(this));
    
  },

  getEmployeeDropdown: function(id){
      var name = this.state.companyEmployees[id];

      return <option key={id}>{name}</option>;

  },

  changeEmployee: function(e){
      this.setState({employeeToAssign: e.target.value});
  },

  changeDropDownState: function(flag){
    this.setState({showDropDown: flag});
  },

  assignShifts: function(){

      if(this.state.employeeToAssign.length>0){
        for(var i in shiftsToAssign){
          var shiftDetails= shiftsToAssign[i];
          for(var date in shiftDetails){
            if(date!=".key"){
              var shiftTime = shiftDetails[date];
              var shiftDate = date+"-2017";
              var dow = moment(shiftDate, "DD-MM-YYYY").day();

              /*
               * REMOVE THIS
               *
              console.log("https://schedulr-c0fd7.firebaseio.com/shifts/"+param('company')+"/2017/"+this.state.weekVal+"/"+dow+"/"+date);*/
              
              var obj ={};
              var shiftRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/shifts/"+param('company')+"/2017/"+this.state.weekVal+"/"+dow+"/"+date);
              obj[shiftTime]=this.state.employeeToAssign;
              
              shiftRef.update(obj);
            }         

          } 
        }
      }
      shiftsToAssign=[];
      this.state.showDropDown = false;
    },

    incWeek: function(){
      shiftDates = [];
      var weekVal = (this.state.weekVal+1);
      this.setState({weekVal: weekVal,});
    },

    decWeek: function(){
      shiftDates = [];
      var weekVal = (this.state.weekVal-1);
      this.setState({weekVal: weekVal,});
    },
  

  render: function() {
    var employeeIDs = [];

    for(var id in this.state.companyEmployees){
      employeeIDs.push(id);
    } 
    
    
    
    return (
      <div>
          
        {this.state.shifts.length != 0 ?
        <Well className='rota-well'>
          {this.state.showDropDown ?
          <div className="employeeList">
            <select onChange={this.changeEmployee} value={this.state.employeeToAssign}>
              <option>-- Select Employee --</option>
                {employeeIDs.map(this.getEmployeeDropdown)}
            </select>
            <button onClick={this.assignShifts}>Assign</button>
          </div> : null}
          <div id="rotaContainer">
            <div className="rotaRow">
              <button id="arrowsAndWeekVal">
                    <a className="weekArrows" onClick={this.decWeek}><FontAwesome name='arrow-left' /></a>
                    Week {this.state.weekVal}
                    <a className="weekArrows" onClick={this.incWeek}><FontAwesome name='arrow-right' /></a>
              </button>
              <button className="time-slot">9:00</button>
              <button className="time-slot">10:00</button>
              <button className="time-slot">11:00</button>
              <button className="time-slot">12:00</button>
              <button className="time-slot">13:00</button>
              <button className="time-slot">14:00</button>
              <button className="time-slot">15:00</button>
              <button className="time-slot">16:00</button>
              <button className="time-slot">17:00</button>
              <button className="time-slot">18:00</button>
              <button className="time-slot">19:00</button>
              <button className="time-slot">20:00</button>
              <button className="time-slot">21:00</button>
            </div>
         
            <ShiftRow row = { 0 }  dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(2017, "YYYY").day(0).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow row = { 1 }  dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(2017, "YYYY").day(1).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow row = { 2 }  dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(2017, "YYYY").day(2).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow row = { 3 }  dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(2017, "YYYY").day(3).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow row = { 4 }  dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(2017, "YYYY").day(4).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow row = { 5 }  dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(2017, "YYYY").day(5).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow row = { 6 }  dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(2017, "YYYY").day(6).week(this.state.weekVal).format("ddd Do MMM") } />
           
          </div>
        </Well>
        : <div className="loadingSpinner">
                          <FontAwesome
                              name='spinner'
                              spin
                            /> 
                        </div>}
      </div>
    );
  }
});

export default React.createClass({
  render() {
      return (
        <div>
          <div>{this.props.children}</div>
          <div id="appPosition">
            
              <div>
                <Rota/> 
              </div>
             
            <div id="footer"/>    
          </div>        
        </div>
        );
    }
  });
