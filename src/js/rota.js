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


export default React.createClass({
  getInitialState: function () {
    return {
      cells: [],
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
    }
  },

  componentWillMount(){
    /*
     *  HARDCODED IMPLEMENTATION OF THE COLUMNS AND ROWS - TO BE UPDATED DYNAMICALLY
     *
     */

    this.shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/shifts');
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

  toggleShowModal: function() {
    this.setState({showModal: !this.state.showModal});

    console.log("this.state.showModal: "+this.state.showModal)
  },

  handler: function(component, event) {
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

      var idOfButton = '#cell-'+component;

      $(idOfButton).addClass("time-slot");
      $(idOfButton).removeClass("time-slot-assigning");
      $('.message-'+component).html("Not Assigned");

    }else{
      var idOfButton = '#cell-'+component;

      $(idOfButton).removeClass("time-slot");
      $(idOfButton).addClass("time-slot-assigning");
      $('.message-'+component).html("");

      this.state.shiftsToAssign.push(component);
    }
    
  },

  changeEmployee: function(event){
    this.setState({assignEmployee: event.target.value});
  },

  assignShifts: function(){

    if(this.state.assignEmployee.length>0){
      var rValue = '';
      var cValue = '';

      for(var i = 0; i<this.state.shiftsToAssign.length; i++){
        var id = this.state.shiftsToAssign[i];

        console.log("ID: " + id);
        

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

        

        if(time.length > 0 && date.length > 0){
          firebase.database().ref('shifts/mannies/'+date+'/'+time).set({
            employee: this.state.assignEmployee,
          });

        }

        var idOfButton = '#cell-'+id;
        $(idOfButton).addClass("time-slot-eile");
        $(idOfButton).removeClass("time-slot-assigning");
        $('.message-'+id).html(this.state.assignEmployee);
      }

      this.setState({
        shiftsToAssign: [],
      });
    }
  },

   render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Well className='rota-well' style={style.well}>
          <div>
            <div className="row assigningRow">
              <div className="col assigning">
                <select onChange={this.changeEmployee} value={this.state.assignEmployee}>
                  <option>--Select an Employee--</option>
                  <option value="Manus">Manus</option>
                  <option value="Emma">Emma</option>
                  <option value="Rebecca">Rebecca</option>
                  <option value="Mark">Mark</option>
                  <option value="Cieran">Cieran</option>
                  <option value="Dylan">Dylan</option>
                  <option value="Sarah">Sarah</option>
                </select>
              </div>
              <div className="col assigning">
                <button onClick={this.assignShifts}>Assign</button>
              </div>
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
