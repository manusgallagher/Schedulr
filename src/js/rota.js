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
var timeMap = {'000':'00:00','100':'1:00','200':'2:00','300':'3:00','400':'4:00','500':'5:00','600':'6:00','700':'7:00','800':'8:00','900':'9:00','1000':'10:00','1100':'11:00','1200':'12:00','1300':'13:00','1400':'14:00','1500':'15:00','1600':'16:00','1700':'17:00','1800':'18:00','1900':'19:00','2000':'20:00','2100':'21:00','2200':'22:00','2300':'23:00'};
var shiftDates = [];
var shiftTimes = [];
var shiftsToAssign = [];

var ShiftRow = React.createClass({

  render: function() {
    var _this = this;
    var createCell = function(item, index) {

      var unassignedCellClicked = function(row, column, cellID, userType){
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
        }
      }
      var cellClicked = function(row, column, cellID, userType){
        if(userType==="Employer"){
          /*
           * CODE TO REASSIGN ASSIGNED SHIFTS
           */
          console.log(cellID);
        }
      }
      var userType = _this.props.userType;
      var row =  _this.props.row;
      var column = index;

      var cellID ="r"+row+"c"+column;

      if(item==='Unassigned'){
        return (              
        <button id={cellID} key={index} onClick={unassignedCellClicked.bind(null, row, column, cellID, userType)} className={'time-slot unassigned'}> 
          <span id={'message-'+cellID}>{item}</span> 
        </button> 
          )
      }else if(item==='Not Open'){
        return (
        <button id={cellID} key={index} className={'time-slot notOpen'}> 
          <span>{item}</span>
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

    var arrayOfTimes = [];
    for(var day in this.props.requirements){
      for(var time in this.props.requirements[day]){
        if(this.props.requirements[day][time]!='No'){
          if(!arrayOfTimes.includes(time)){
            arrayOfTimes.push(time);
          }
        }
      }
    }
    for(var dates in weeklyShifts){
        if(dates!=".key"){
          shiftDates.push(dates);
          var shifts = weeklyShifts[dates];
        
          for(var times in shifts){
            if(arrayOfTimes.includes(times)){
              shiftsAssigned.push(shifts[times]);
              shiftTimes.push(times);
            }
            
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
      holidays: [],
      employeeToAssign: "",
      companyEmployees: [],
      showDropDown: false,
      userType: '',
      employeesAvailable: [],
      shiftsToBeAssigned: [],
      constraints: [],
      requirements: [],
    };
  },

  componentWillMount: function() {
    
    this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/shifts/"+param('company')+"/"+this.state.yearVal), "shifts");
    this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/holidays"), "holidays");
    this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/ShiftRequirements"), "requirements");
   
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
      var _this = this;
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
              var count  = 0; 
              for(var day=0; day<7; day++){
                var shiftFormat = {  
                                '000' :'Not Open',
                                '100' :'Not Open',
                                '200' :'Not Open',
                                '300' :'Not Open',
                                '400' :'Not Open',
                                '500' :'Not Open',
                                '600' :'Not Open',
                                '700' :'Not Open',
                                '800' :'Not Open',
                                '900' :'Not Open',
                                '1000':'Not Open',
                                '1100':'Not Open',
                                '1200':'Not Open',
                                '1300':'Not Open',
                                '1400':'Not Open',
                                '1500':'Not Open',
                                '1600':'Not Open',
                                '1700':'Not Open',
                                '1800':'Not Open',
                                '1900':'Not Open',
                                '2000':'Not Open',
                                '2100':'Not Open',
                                '2200':'Not Open',
                                '2300':'Not Open',};

                var date = moment(year, "YYYY").day(day).week(week);
                
                var shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/shifts/'+param('company')+'/'+year+'/'+week+'/'+count+'/'+date.format("DD-MM"));
                shiftRef.set(shiftFormat);
                
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
      var minShift = this.state.constraints[2];

      for(var day in shiftsToAssign){
        var availableTimes = shiftsToAssign[day];

        for(var times = 0; times<availableTimes.length; times+=0){

          var employeesThatAreAvailable =[];
          //console.log(day +": " + availableTimes[times]);
          for(var id in employeeAvailabilities){
            if(employeeAvailabilities[id][day].includes(availableTimes[times])){
              employeesThatAreAvailable.push(id);
            }
          }
         /*
          * Function - Checks if available Employees have day 'booked off'
          */
          var employeesAvailableAfterHolidays = this.bookedOff(employeesThatAreAvailable, day, availableTimes[times]);

         /*
          * Function - Checks if available Employees can work X more shifts
          */
          var employeesThatCanWorkXMoreShifts = [];
          for(var i = 0; i<employeesAvailableAfterHolidays.length; i++){
            
            var flag = false;
            for(var j = 1; j<minShift; j++){
              if(employeeAvailabilities[employeesAvailableAfterHolidays[i]][day].includes(availableTimes[times+j])){
                flag = true;
              }else{
                flag = false;
                break;
              }
            }

            if(flag){
              employeesThatCanWorkXMoreShifts.push(employeesAvailableAfterHolidays[i]);
            }
          }

          console.log("The following can work " + day + " at " + availableTimes[times] + " for a at least " + minShift + " shifts.");
          console.log(employeesThatCanWorkXMoreShifts);

           /*
            * After Assigning,
            * Apply logic here to skip the assigned shifts.
            */
           var numOfHoursAssigned = 4;
           times+=numOfHoursAssigned;
           break;
        }
        break;
      }
    },

    bookedOff: function(employees, day, time){
      var holidaysApproved = this.state.holidays[0];
      var employeesWithHolidaysApproved = [];
      var date = moment([this.state.yearVal]).week(this.state.weekVal).day(day).format("DD-MM-YYYY");
      var employeesAvailable = [];


      for(var id in holidaysApproved){
        employeesWithHolidaysApproved.push(id);
      }

      for(var i = 0; i < employees.length; i++){
        var employeeID = employees[i];
        if(employeesWithHolidaysApproved.includes(employeeID)){
          /*
           * The following employees are available for the
           * selected shift BUT do have holidays booked.
           * Check if the selected dday is booked off.
           */
          var employeeHolidays = holidaysApproved[employeeID]['dates'];
          if(!employeeHolidays.includes(date)){
            employeesAvailable.push(employeeID);
          }
        }
        else{
          employeesAvailable.push(employeeID);
        }

      }

      return employeesAvailable;
    },

    createHeader: function(item, index){

      return (<button key={index} className="time-slot">{timeMap[item]}</button>);
    },

    getTableHeaders: function(){
      var arrayOfTimes = [];
      for(var day in this.state.requirements){
        for(var time in this.state.requirements[day]){
          if(this.state.requirements[day][time]!='No'){
            if(!arrayOfTimes.includes(time)){
              arrayOfTimes.push(time);
            }
          }
        }
      }

      return (<span>{arrayOfTimes.map(this.createHeader)}</span>);
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
              {this.getTableHeaders()}
            </div>
         
            <ShiftRow requirements={this.state.requirements} userType={this.state.userType} row = { 0 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(0).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow requirements={this.state.requirements} userType={this.state.userType} row = { 1 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(1).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow requirements={this.state.requirements} userType={this.state.userType} row = { 2 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(2).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow requirements={this.state.requirements} userType={this.state.userType} row = { 3 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(3).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow requirements={this.state.requirements} userType={this.state.userType} row = { 4 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(4).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow requirements={this.state.requirements} userType={this.state.userType} row = { 5 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(5).week(this.state.weekVal).format("ddd Do MMM") } />
            <ShiftRow requirements={this.state.requirements} userType={this.state.userType} row = { 6 } dropdownStatus = {this.state.showDropDown} changeDropdownStatus = {this.changeDropDownState} shifts={ this.state.shifts } weekVal={ this.state.weekVal } date = { moment(this.state.yearVal, "YYYY").day(6).week(this.state.weekVal).format("ddd Do MMM") } />
           
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