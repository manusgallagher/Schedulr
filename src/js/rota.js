import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Modal, Button } from 'react-bootstrap';
import Row from './row';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import { Table } from 'react-bootstrap';


var database = firebase.database();

  const style = {
    well: {
      width: '80%',
      height: '80%',
      position: 'fixed',
      top: '55%',
      left: '50%',
      /* bring your own prefixes */
      transform: 'translate(-50%, -50%)',
    },
    weekButton:{
      color: 'black',
      marginRight: '5px',
      marginLeft: '5px',
      float:'left',
    },
    weekValue:{
      backgroundColor: 'red',

    },
    tableHeader:{
      textAlign: 'center',
    },
    weekStepper:{
      float: 'right',
      paddingRight: '2%',
    },
    times:{
      width: '6.5%',
      fontWeight: 'bold',
      textAlign: 'center',
      verticalAlign:'middle',
    },
  };

  var rowMap = {'r1':'0800','r2':'0900','r3':'1000','r4':'1100','r5':'1200','r6':'1300','r7':'1400','r8':'1500','r9':'1600','r10':'1700','r11':'1800','r12':'1900','r13':'2000','r14':'2100'};
  var rowMapInverse = {'0800':'r1','0900':'r2','1000':'r3','1100':'r4','1200':'r5','1300':'r6','1400':'r7','1500':'r8','1600':'r9','1700':'r10','1800':'r11','1900':'r12','2000':'r13','2100':'r14'};
  $(".assigningRow").hide();

export default React.createClass({
  getInitialState: function () {
    return {
      weekVal: '',
      yearVal: '',
      monDate: '',
      tuesDate: '',
      wedDate: '',
      thursDate: '',
      friDate: '',
      satDate: '',
      sunDate: '',
      shiftDates: '',
      shiftTimes: '',
      shiftEmployees: '',
      assignEmployee: '',
      showModal: false,
      shiftsToAssign:[],
      companyEmployees: [],
      showAssign: false,
      userRole: '',
    }
  },

  componentWillMount(){

    this.companyRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+this.param('company'));
    this.companyRef.once("value", function(companySnapshot) {
      var employees = companySnapshot.val().Employees;
      var employeeStruct = [];
      for(var i in employees)
      {
            var fullName = employees[i].Name;
            var name = "";
            for(var j =0; j<fullName.length; j++){
              if(fullName.charAt(j)!=' '){
               name += fullName.charAt(j);
              }else{
                break;
              }            
            }
           employeeStruct.push(name);
      }
      
      this.setState({
        companyEmployees: employeeStruct,
      });

    }.bind(this));

    this.shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/shifts/'+this.param('company')+'/allocations');
    this.shiftRef.on("child_added", function(dataSnapshot) {

      var p = dataSnapshot.val();
      var tShiftDates = [];
      var tShiftTimes = [];
      var tShiftEmployees = [];

      for (var i in p){
          var times = p[i];
          for(var j in times){
            tShiftDates.push(i);
            tShiftTimes.push(j);
            tShiftEmployees.push(times[j].employee);
          }
      }

      this.setState({
        shiftDates: tShiftDates,
        shiftTimes: tShiftTimes,
        shiftEmployees: tShiftEmployees          
      });
    }.bind(this));

    this.employeeRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/users/'+this.param('id'));
    this.employeeRef.on("value", function(dataSnapshot) {
      var userType = '';

      if(dataSnapshot.val().EmployerOf){
        userType = "Employer";
      }else{
        userType = "Employee";
      }

      this.setState({
        userRole: userType,
      });
      
    }.bind(this));

    this.setState({
      weekVal: moment().week(),
      yearVal: moment().year(),
      monDate: moment([moment().year()]).day("Monday").week(moment().week()).format("DD-MM-YYYY"),
      tuesDate: moment([moment().year()]).day("Tuesday").week(moment().week()).format("DD-MM-YYYY"),
      wedDate: moment([moment().year()]).day("Wednesday").week(moment().week()).format("DD-MM-YYYY"),
      thursDate: moment([moment().year()]).day("Thursday").week(moment().week()).format("DD-MM-YYYY"),
      friDate: moment([moment().year()]).day("Friday").week(moment().week()).format("DD-MM-YYYY"),
      satDate: moment([moment().year()]).day("Saturday").week(moment().week()).format("DD-MM-YYYY"),
      sunDate: moment([moment().year()]).day("Sunday").week(moment().week()).format("DD-MM-YYYY"),
    });

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

  changeWeekDec: function(){
    var tempWeekVal = this.state.weekVal;
    var tempYearVal = this.state.yearVal;
    

    if(tempWeekVal === 1){
      tempYearVal -= 1;
      tempWeekVal = moment([tempYearVal]).weeksInYear();
    } else{
      tempWeekVal -= 1;
    }

    this.setState({
      weekVal: tempWeekVal,
      yearVal: tempYearVal,
      monDate: moment([tempYearVal]).day("Monday").week(tempWeekVal).format("DD-MM-YYYY"),
      tuesDate: moment([tempYearVal]).day("Tuesday").week(tempWeekVal).format("DD-MM-YYYY"),
      wedDate: moment([tempYearVal]).day("Wednesday").week(tempWeekVal).format("DD-MM-YYYY"),
      thursDate: moment([tempYearVal]).day("Thursday").week(tempWeekVal).format("DD-MM-YYYY"),
      friDate: moment([tempYearVal]).day("Friday").week(tempWeekVal).format("DD-MM-YYYY"),
      satDate: moment([tempYearVal]).day("Saturday").week(tempWeekVal).format("DD-MM-YYYY"),
      sunDate: moment([tempYearVal]).day("Sunday").week(tempWeekVal).format("DD-MM-YYYY")
    });


  },

  changeWeekInc: function(){
    var tempWeekVal = this.state.weekVal;
    var tempYearVal = this.state.yearVal;

    if(tempWeekVal === moment([tempYearVal]).weeksInYear()){
      tempWeekVal = 1;
      tempYearVal += 1;
    } else{
      tempWeekVal += 1;
    }

    this.setState({
      weekVal: tempWeekVal,
      yearVal: tempYearVal,
      monDate: moment([tempYearVal]).day("Monday").week(tempWeekVal).format("DD-MM-YYYY"),
      tuesDate: moment([tempYearVal]).day("Tuesday").week(tempWeekVal).format("DD-MM-YYYY"),
      wedDate: moment([tempYearVal]).day("Wednesday").week(tempWeekVal).format("DD-MM-YYYY"),
      thursDate: moment([tempYearVal]).day("Thursday").week(tempWeekVal).format("DD-MM-YYYY"),
      friDate: moment([tempYearVal]).day("Friday").week(tempWeekVal).format("DD-MM-YYYY"),
      satDate: moment([tempYearVal]).day("Saturday").week(tempWeekVal).format("DD-MM-YYYY"),
      sunDate: moment([tempYearVal]).day("Sunday").week(tempWeekVal).format("DD-MM-YYYY")
    });

  },

  handler: function(component, event) {
    if(this.state.userRole==='Employer'){
      if(this.state.shiftsToAssign.includes(component)){

        var tempArr = this.state.shiftsToAssign;

        for(var i = tempArr.length; i--;){
          if(tempArr[i]===component){
            tempArr.splice(i, 1);
          }
        }

        this.setState({
          shiftsToAssign: tempArr,         
        });

        var idOfButton = '#'+component;

        $(idOfButton).addClass("time-slot-unassigned");
        $(idOfButton).removeClass("time-slot-assigning");
        $('#message-'+component).html("Not Assigned");


        if(tempArr.length===0){
          this.setState({
            showAssign: false,         
          });
        }

      }else{
        var idOfButton = '#'+component;

        $(idOfButton).removeClass("time-slot-unassigned");
        $(idOfButton).addClass("time-slot-assigning");
        $('#message-'+component).html("");

        this.state.shiftsToAssign.push(component);
        this.setState({
            showAssign: true,         
          });
      }
    }
  },

  changeEmployee: function(event){
    this.setState({assignEmployee: event.target.value});
  },

  getRowAndColumnValues: function(id){
    var rValue="";
    var cValue="";

    for(var j=0; j<id.length; j++){
        if(id.charAt(j)==='c'){

          rValue = id.substring(0, j);
          cValue = id.substring(j, id.length);
        }
      }

     var time = rowMap[rValue];

     var date = "";
      
      //console.log("cValue: " + cValue);
      if(cValue==='c1'){
        date = this.state.sunDate;
      }else if(cValue==='c2'){
        date = this.state.monDate;
      }else if(cValue==='c3'){
        date = this.state.tuesDate;
      }else if(cValue==='c4'){
        date = this.state.wedDate;
      }else if(cValue==='c5'){
        date = this.state.thursDate;
      }else if(cValue==='c6'){
        date = this.state.friDate;
      }else {
        date = this.state.satDate;
      }

      return [time, date];
  },

  assignShifts: function(){

    if(this.state.assignEmployee.length>0){

      for(var i = 0; i<this.state.shiftsToAssign.length; i++){
        var id = this.state.shiftsToAssign[i];

        var timeAndDate = this.getRowAndColumnValues(id);

        var time = timeAndDate[0];
        var date = timeAndDate[1];
        

        if(time.length > 0 && date.length > 0){
          firebase.database().ref('shifts/'+this.param('company')+'/allocations/'+date+'/'+time).set({
            employee: this.state.assignEmployee,
          });

        }

        var idOfButton = '#'+id;
        $(idOfButton).addClass("time-slot-assigned");
        $(idOfButton).removeClass("time-slot-assigning");
        $('#message-'+id).html(this.state.assignEmployee);
      }

      this.setState({
        shiftsToAssign: [],
        showAssign: false,
      });
    }
  },

  getList: function(name){
    return <option key={name}>{name}</option>;
  },

  getRandomInt: function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  },

  autoSchedule: function(){
    console.log("Auto Scheduling Initiated!!");
    var idsToBeAssigned = $('.time-slot-unassigned').map(function() {
      return $(this).attr('id');
    });
    var employeeList = this.state.companyEmployees;
    console.log(employeeList.length + ": "+employeeList);

    for(var i =0; i<idsToBeAssigned.length; i++){
      var rand = this.getRandomInt(0,employeeList.length);
      var employee = employeeList[rand];

      var id = idsToBeAssigned[i];

      var timeAndDate = this.getRowAndColumnValues(id);
      var time = timeAndDate[0];
      var date = timeAndDate[1];


     if(time.length > 0 && date.length > 0){
        firebase.database().ref('shifts/'+this.param('company')+'/allocations/'+date+'/'+time).set({
          employee: employee,
        });
      }

      $("#"+id).removeClass("time-slot-unassigned");
      $("#"+id).addClass("time-slot-assigned");
      $("#message-"+id).html(employee);
    }
    
  },

   render() {
    //$(".assigningRow").hide();
    var employeeList = this.state.companyEmployees;

    return (
      <div>
        <div>{this.props.children}</div>
        <Well className='rota-well' style={style.well}>
          <div>
          
            <div className="row assigningRow">
            { this.state.showAssign ?  
              <div>
                <div className="col assigning">
                  <select onChange={this.changeEmployee} value={this.state.assignEmployee}>
                    <option>-- Select Employee --</option>
                    {employeeList.map(this.getList)}
                  </select>
                </div>

                <div className="col assigning">
                  <button onClick={this.assignShifts}>Assign</button>
                </div> 
              </div> : 


              <div>
                { this.state.userRole === 'Employer' ?
                  <button onClick={this.autoSchedule}>Auto Assign</button> :null
                }
              </div>

            }
            </div>
            
            <Table id="calendarView" responsive>
                  <thead>
                    <tr>
                      <th style={style.times}>
                        <div style={style.weekValue}>
                          <a style={style.weekButton} onClick={this.changeWeekDec}><FontAwesome name='arrow-left' /></a>
                          <a style={style.weekButton} onClick={this.changeWeekInc}><FontAwesome name='arrow-right' /></a>
                        </div>
                      </th>
                      <th style={style.tableHeader}>{this.state.sunDate}</th>
                      <th style={style.tableHeader}>{this.state.monDate}</th>
                      <th style={style.tableHeader}>{this.state.tuesDate}</th>
                      <th style={style.tableHeader}>{this.state.wedDate}</th>
                      <th style={style.tableHeader}>{this.state.thursDate}</th>
                      <th style={style.tableHeader}>{this.state.friDate}</th>
                      <th style={style.tableHeader}>{this.state.satDate}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Row handler={this.handler}  time={"8.00"}  r={"r1"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"9.00"}  r={"r2"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"10.00"} r={"r3"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"11.00"} r={"r4"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"12.00"} r={"r5"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"13.00"} r={"r6"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"14.00"} r={"r7"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"15.00"} r={"r8"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"16.00"} r={"r9"}  week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"17.00"} r={"r10"} week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"18.00"} r={"r11"} week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"19.00"} r={"r12"} week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"20.00"} r={"r13"} week={this.state.weekVal} year={this.state.yearVal} />
                    <Row handler={this.handler}  time={"21.00"} r={"r14"} week={this.state.weekVal} year={this.state.yearVal} />

                  </tbody>
            </Table>
          </div>
        </Well>         
      </div>
    );
  }
});
