import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Modal, Button } from 'react-bootstrap';
import Row from './row';
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
      var shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/ShiftsTemp/0TI1WWQ/'+year+'/'+week+'/'+count+'/'+date.format("DD-MM"));
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
var employeesList = ["Becky", "Emma", "Cieran", "Dylan", "Mark", "Sarah", "Joey", "Jason", "Kunal", "Rachel"];
var assignEmployee = "";
var columnValue = -1;
var shiftDates = [];
var shiftTimes = [];
var weekNum = 9;
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
      }

      var row =  columnValue;
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
    for(var dates in this.props.shifts){
        if(dates!=".key"){
          shiftDates.push(dates);
          var shifts = this.props.shifts[dates];
        
          for(var times in shifts){
            shiftsAssigned.push(shifts[times]);
            shiftTimes.push(times);
          }
      }
    }
    
    if(columnValue===6){
        columnValue=0;
      }else{
        columnValue++;
      }
    return <div className="rotaRow"><button className="time-slot">{this.props.date}</button>{shiftsAssigned.map(createCell)}</div>;
      
  }
});

var Rota = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return {
      shifts: []
    };
  },

  componentWillMount: function() {
    this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/ShiftsTemp/0TI1WWQ/2017/"+weekNum), "shifts");
  },
  

  render: function() {
    
    function changeEmployee(e){
      assignEmployee = e.target.value;
    }

    function createEmployeeList(name){
     // var name = this.state.companyEmployeesID[id];

     return <option key={name}>{name}</option>;
    }

    function assignShifts(){

      if(assignEmployee.length>0){
        for(var i in shiftsToAssign){
          var shiftDetails= shiftsToAssign[i];
          for(var date in shiftDetails){
            if(date!=".key"){
              var shiftTime = shiftDetails[date];
              var shiftDate = date+"-2017";
              var dow = moment(shiftDate, "DD-MM-YYYY").day();

              console.log("https://schedulr-c0fd7.firebaseio.com/ShiftsTemp/0TI1WWQ/2017/"+weekNum+"/"+dow+"/"+date);
              
              var obj ={};
              var shiftRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/ShiftsTemp/0TI1WWQ/2017/"+weekNum+"/"+dow+"/"+date);
              obj[shiftTime]=assignEmployee;
              
              shiftRef.update(obj);
            }           

          }
        }
      }
      shiftsToAssign=[]; 
    }
    

    return (
      <div>
        <div className="employeeList">
          <select onChange={changeEmployee} value={assignEmployee}>
            <option>-- Select Employee --</option>
              {employeesList.map(createEmployeeList)}
          </select>
          <button onClick={assignShifts}>Assign</button>
        </div>
        <div id="rotaContainer">
          <div className="rotaRow">
            <button className="time-slot">times:</button>
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
          <ShiftRow row ={"0"} shifts={ this.state.shifts[0] }  date = { moment(2017, "YYYY").day(0).week(9).format("ddd Do MMM") } />
          <ShiftRow row ={"1"} shifts={ this.state.shifts[1] }  date = { moment(2017, "YYYY").day(1).week(9).format("ddd Do MMM") } />
          <ShiftRow row ={"2"} shifts={ this.state.shifts[2] }  date = { moment(2017, "YYYY").day(2).week(9).format("ddd Do MMM") } />
          <ShiftRow row ={"3"} shifts={ this.state.shifts[3] }  date = { moment(2017, "YYYY").day(3).week(9).format("ddd Do MMM") } />
          <ShiftRow row ={"4"} shifts={ this.state.shifts[4] }  date = { moment(2017, "YYYY").day(4).week(9).format("ddd Do MMM") } />
          <ShiftRow row ={"5"} shifts={ this.state.shifts[5] }  date = { moment(2017, "YYYY").day(5).week(9).format("ddd Do MMM") } />
          <ShiftRow row ={"6"} shifts={ this.state.shifts[6] }  date = { moment(2017, "YYYY").day(6).week(9).format("ddd Do MMM") } />
        </div>
      </div>
    );
  }
});

export default React.createClass({
  render() {
      return (
          <div>
            <div>{this.props.children}</div>
            <Well className='rota-well'>
              <div>
                <Rota/> 
              </div>
            </Well>         
          </div>
        );
    }
  });
