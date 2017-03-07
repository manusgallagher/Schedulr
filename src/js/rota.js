import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Modal, Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import { Table } from 'react-bootstrap';


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

      var cellClicked = function(row, column, cellID, userType){
        if(userType==="Employer"){
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

          //console.log(shiftsToAssign);
        }
      }
      var userType = _this.props.userType;
      var row =  _this.props.row;
      var column = index;

      var cellID ="r"+row+"c"+column;

      if(item==='Unassigned'){
        return (              
        <button id={cellID} key={index} onClick={cellClicked.bind(null, row, column, cellID, userType)} className={'time-slot unassigned'}> 
          <span id={'message-'+cellID}>{item}</span> 
        </button> 
          )
      }else{
        return (
        <button id={cellID} key={index} onClick={cellClicked.bind(null, row, column, cellID, userType)} className={'time-slot assigned'}> 
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
      weekVal: moment().week(),
      yearVal: moment().year(),
      numOfWeeks : moment().weeksInYear(),
      shifts: [],
      employeeToAssign: "",
      companyEmployees: [],
      showDropDown: false,
      userType: '',
      employeesAvailable: [],
      shiftsToBeAssigned: [],
    };
  },

  componentWillMount: function() {
    
    this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/shifts/"+param('company')+"/"+this.state.yearVal), "shifts");
   
    
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

    this.employeeRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/users/'+param('id'));
    this.employeeRef.on("value", function(dataSnapshot) {
      var userType = '';

      if(dataSnapshot.val().EmployerOf){
        userType = "Employer";
         this.shiftRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/shifts/"+param('company')+"/"+this.state.yearVal).once("value", function(snap){
          var _this = this;
          if(!snap.val()){
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
            }
          }
        });
      }else{
        userType = "Employee";
      }

      this.setState({
        userType: userType,
      });
      
    }.bind(this));

    this.shiftRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/Employees").once("value", function(snap){
        var allAvailabilities = {};
        for(var id in snap.val()){
          var empAvailablities= (snap.val()[id]['availabilities']);
          var obj = {}
          for(var i in empAvailablities){
            var shifts = empAvailablities[i];
            var availableShifts = [];
            for(var times in shifts){
              if(shifts[times]===true){
                availableShifts.push(times);
              }
            }
            obj[i]=availableShifts;
          }
          allAvailabilities[id]=obj;
        }
        this.setState({employeeAvailabilities: allAvailabilities});
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
          var shiftRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/shifts/"+param('company')+"/"+this.state.yearVal+"/"+this.state.weekVal+"/"+dow+"/"+date);
          obj[shiftTime]=this.state.employeeToAssign;

          shiftRef.update(obj);
        }         

      } 
    }

    shiftsToAssign=[];
    this.state.showDropDown = false;
  },

    incWeek: function(){
      shiftDates = [];

      

      if(this.state.weekVal<this.state.numOfWeeks){
        var weekVal = (this.state.weekVal+1);
        this.setState({weekVal: weekVal,});
      }else{
        var weekVal = 1;
        var yearVal = (this.state.yearVal+1);
        this.setState({
          weekVal: weekVal,
          yearVal: yearVal,
        });
      }
      
    },

    decWeek: function(){
      shiftDates = [];
      

      if(this.state.weekVal>1){
        var weekVal = (this.state.weekVal-1);
        this.setState({weekVal: weekVal,});
      }else{
        var yearVal = (this.state.yearVal-1);
        var weekVal = moment(yearVal, "YYYY").weeksInYear();

        this.setState({
          weekVal: weekVal,
          yearVal: yearVal,
        });
      }
    },

    getEmployees: function(){
      var employeeIDs = [];
        for(var id in this.state.companyEmployees){
          employeeIDs.push(id);
        }
        
          /*var dow, time;        
          var prevAvailable = this.state.employeesAvailable;
          var nowAvailable = [];
          console.log("Previously Available: ");
          console.log(prevAvailable);
          var dow, time;

          for(var i in shiftsToAssign){
            for(var j in shiftsToAssign[i]){
              dow = moment(j+"-2017", "DD-MM-YYYY").day();
              time = shiftsToAssign[i][j]; 
            }
          }
          this.ShiftRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/Employees").once("value", function(employeeSnap){
            for(var id in employeeSnap.val()){
              if(employeeSnap.val()[id]['availabilities'][dow][time]){
                nowAvailable.push(id);
              }
            }
            this.setState({employeesAvailable: nowAvailable});
            
          }.bind(this));*/
        
        

        return employeeIDs;

    },
    getShifts: function(){
      var weekArray = this.state.shifts[this.state.weekVal];
      var dateAndTimes = {};
      var count = 0;
      for(var i =0; i<weekArray.length; i++){
        var date = weekArray[i];
        for(var j in date){
          var dayShifts=date[j];
          var unassignedShifts = [];
          for(var times in dayShifts){
            if(dayShifts[times]==="Unassigned"){
              unassignedShifts.push(times);
            }
          }
          dateAndTimes[count++]=unassignedShifts;
        }
      }
      return dateAndTimes;
    },

    autoAssign: function(){
      var shiftsToAssign = this.getShifts();
      var employeeAvailabilities = this.state.employeeAvailabilities;


      for(var day in shiftsToAssign){
        var availableTimes = shiftsToAssign[day];

        for(var times = 0; times<availableTimes.length; times++){
          var employeesThatAreAvailable =[];
          //console.log(day +": " + availableTimes[times]);
          for(var id in employeeAvailabilities){
            if(employeeAvailabilities[id][day].includes(availableTimes[times])){
              employeesThatAreAvailable.push(id);
            }
          }
          /*console.log("The following can work " + day + " at " + availableTimes[times]);
          console.log(employeesThatAreAvailable);*/

          employeesThatAreAvailable = this.bookedOff(employeesThatAreAvailable, day, availableTimes[times]);
          console.log(employeesThatAreAvailable);
          /*
           * Add Logic Here to Check if any employee in 
           * the above [] has 'day' booked off.
           *
           */
          break;
        }
        break;
      }
    },

    bookedOff: function(employees, day, time){
      //console.log("The following can work " + day + " at " + time);
      for(var i = 0; i < employees.length; i++){
        var employeeID = employees[i];
      }




      return ["Manus"];
    },
  
  render: function() {
    
    return (
      <div>
        {this.state.shifts.length != 0 ?
        <Well className='rota-well'>
          {this.state.showDropDown === false && this.state.userType === "Employer" ?
            <button onClick={this.autoAssign}>Auto Assign</button> : null } 
          {this.state.showDropDown === true && this.state.userType === "Employer"?
          <div className="employeeList">
            <select onChange={this.changeEmployee} value={this.state.employeeToAssign}>
              <option>-- Select Employee --</option>
                {this.getEmployees(null).map(this.getEmployeeDropdown)}
            </select>
            <button onClick={this.assignShifts}>Assign</button>
          </div> : null}
          <div id="rotaContainer">
            <div className="rotaRow">
              <button id="arrowsAndWeekVal">
                    <span id="rotaYearValue">{this.state.yearVal}</span>
                    <br/>
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
         
            <ShiftRow userType={this.state.userType} row = { 0 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(0).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow userType={this.state.userType} row = { 1 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(1).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow userType={this.state.userType} row = { 2 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(2).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow userType={this.state.userType} row = { 3 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(3).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow userType={this.state.userType} row = { 4 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(4).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow userType={this.state.userType} row = { 5 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(5).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow userType={this.state.userType} row = { 6 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(6).week(this.state.weekVal).format("ddd Do MMM") } />
           
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
