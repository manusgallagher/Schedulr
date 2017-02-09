import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Modal, Button } from 'react-bootstrap';
import Schedule from './schedule';
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

  const pleaseWork =() =>{
    console.log("pleeeeeeeeeeeeeeeeeeeeeeeeeease");
  };

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
      showModal: false,
      assignDate: '',
      assignTime: '',
      assignEmployee: '',
    }
  },

  componentWillMount(){
    /*
     *  HARDCODED IMPLEMENTATION OF THE COLUMNS AND ROWS - TO BE UPDATED DYNAMICALLY
     *
     */
    this.state.cells.push("c1r1", "c1r2", "c1r3", "c1r4", "c1r5", "c1r6", "c1r7", "c1r8", "c1r9", "c1r10", "c1r11", "c1r12", "c1r13", "c1r14");
    this.state.cells.push("c2r1", "c2r2", "c2r3", "c2r4", "c2r5", "c2r6", "c2r7", "c2r8", "c2r9", "c2r10", "c2r11", "c2r12", "c2r13", "c2r14");
    this.state.cells.push("c3r1", "c3r2", "c3r3", "c3r4", "c3r5", "c3r6", "c3r7", "c3r8", "c3r9", "c3r10", "c3r11", "c3r12", "c3r13", "c3r14");
    this.state.cells.push("c4r1", "c4r2", "c4r3", "c4r4", "c4r5", "c4r6", "c4r7", "c4r8", "c4r9", "c4r10", "c4r11", "c4r12", "c4r13", "c4r14");
    this.state.cells.push("c5r1", "c5r2", "c5r3", "c5r4", "c5r5", "c5r6", "c5r7", "c5r8", "c5r9", "c5r10", "c5r11", "c5r12", "c5r13", "c5r14");
    this.state.cells.push("c6r1", "c6r2", "c6r3", "c6r4", "c6r5", "c6r6", "c6r7", "c6r8", "c6r9", "c6r10", "c6r11", "c6r12", "c6r13", "c6r14");
    this.state.cells.push("c7r1", "c7r2", "c7r3", "c7r4", "c7r5", "c7r6", "c7r7", "c7r8", "c7r9", "c7r10", "c7r11", "c7r12", "c7r13", "c7r14");
    

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
    $( ".shiftAssigned" ).html("");
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
    $( ".shiftAssigned" ).html("");
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

  trialAndError: function(){
    var stringToAppend = '#';
    var cValue = '';
    var rValue = '';

    for(var i = 0; i<this.state.cells.length; i++){
      var shiftDate = "";
      var shiftTime = "";

      for(var j =0; j<this.state.cells[i].length; j++){

        if(this.state.cells[i].charAt(j) === 'r'){
          cValue = this.state.cells[i].substring(0,j);
          rValue = this.state.cells[i].substring(j,this.state.cells[i].length);

          //console.log(cValue + " : " + rValue);

          shiftTime = rowMap[rValue];

          if(cValue==='c1'){
            shiftDate = this.state.sunDate;
          }else if(cValue==='c2'){
            shiftDate = this.state.monDate;
          }else if(cValue==='c3'){
            shiftDate = this.state.tuesDate;
          }else if(cValue==='c4'){
            shiftDate = this.state.wedDate;
          }else if(cValue==='c5'){
            shiftDate = this.state.thursDate;
          }else if(cValue==='c6'){
            shiftDate = this.state.friDate;
          }else{
            shiftDate = this.state.satDate;
          }
        }
      }

      for(var k = 0; k<this.state.shiftDates.length; k++){
        if(this.state.shiftDates[k]===shiftDate && this.state.shiftTimes[k]===shiftTime){
          var id = cValue+rValue;

          $("#"+cValue+rValue).html("<div id='"+ id +"' class='time-slot-eile'> \
                                      <button> \
                                        <span id='message-"+id+"'>"+ this.state.shiftEmployees[k] +"</span> \
                                      </button> \
                                    </div>");
          $( "#"+cValue+rValue ).addClass( "shiftAssigned" );

        }
      }
    }
    for(var i = 0; i<this.state.cells.length; i++){
      var id = '#'+this.state.cells[i];
      var mb = $(id).text();
      if(mb.length==0){
        $(id).html("<div id='"+ id +"' class='time-slot'> \
                                      <button> \
                                        <span id='message-"+id+"'>Not Assigned</span> \
                                      </button> \
                                    </div>");
        $(id).addClass( "noShiftAssigned" );
      }
    }
  },

  openModal: function(){
    this.setState({ 
      showModal: true,
      assignTime: '',
      assignDate: '',
      assignEmployee: '',
    });
  },

  closeModal: function(){
    this.setState({ showModal: false });
  },

  assignShift: function(){

    var date = "";
    var time = this.state.assignTime;
    var employee = this.state.assignEmployee;
    var cValue = '';
    var rValue = rowMapInverse[time]

    if(this.state.assignDate === 'sunday'){
      date = this.state.sunDate;
      cValue = 'c1';
    }else if(this.state.assignDate === 'monday'){
      date = this.state.monDate;
      cValue = 'c2';
    }else if(this.state.assignDate === 'tuesday'){
      date = this.state.tuesDate;
      cValue = 'c3';
    }else if(this.state.assignDate === 'wednesday'){
      date = this.state.wedDate;
      cValue = 'c4';
    }else if(this.state.assignDate === 'thursday'){
      date = this.state.thursDate;
      cValue = 'c5';
    }else if(this.state.assignDate === 'friday'){
      date = this.state.friDate;
      cValue = 'c6';
    }else if(this.state.assignDate === 'Saturday'){
      date = this.state.satDate;
      cValue = 'c7';
    }else{
      date = "";
    }

    

    if(date.length > 0 && time.length > 0 && employee.length>0){

      firebase.database().ref('shifts/mannies/' + date + '/'+time).set({
          employee: employee,
      });
      
      var id = cValue+rValue;
      $("#"+id).html("<div id='"+ id +"' class='time-slot-eile'> \
                                    <button> \
                                      <span id='message-"+id+"'>"+ employee +"</span> \
                                    </button> \
                                  </div>");
      $( "#"+cValue+rValue ).removeClass( "noShiftAssigned" );
      $( "#"+cValue+rValue ).addClass( "shiftAssigned" );

      this.setState({ showModal: false });
    }
  },

  changeDate: function(event){
    this.setState({assignDate: event.target.value});
  },

  changeTime: function(event){
    this.setState({assignTime: event.target.value});
  },

  changeEmployee: function(event){
    this.setState({assignEmployee: event.target.value});
  },

   render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Well className='rota-well' style={style.well}>
          <div>
            {this.trialAndError()}
            <button onClick={this.openModal}>Assign</button>
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
                    <tr>
                      <td style={style.times}>8:00</td>
                      <td id ="c1r1"></td>
                      <td id ="c2r1"></td>
                      <td id ="c3r1"></td>
                      <td id ="c4r1"></td>
                      <td id ="c5r1"></td>
                      <td id ="c6r1"></td>
                      <td id ="c7r1"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>9:00</td>
                      <td id ="c1r2"></td>
                      <td id ="c2r2"></td>
                      <td id ="c3r2"></td>
                      <td id ="c4r2"></td>
                      <td id ="c5r2"></td>
                      <td id ="c6r2"></td>
                      <td id ="c7r2"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>10:00</td>
                      <td id ="c1r3"></td>
                      <td id ="c2r3"></td>
                      <td id ="c3r3"></td>
                      <td id ="c4r3"></td>
                      <td id ="c5r3"></td>
                      <td id ="c6r3"></td>
                      <td id ="c7r3"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>11:00</td>
                      <td id ="c1r4"></td>
                      <td id ="c2r4"></td>
                      <td id ="c3r4"></td>
                      <td id ="c4r4"></td>
                      <td id ="c5r4"></td>
                      <td id ="c6r4"></td>
                      <td id ="c7r4"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>12:00</td>
                      <td id ="c1r5"></td>
                      <td id ="c2r5"></td>
                      <td id ="c3r5"></td>
                      <td id ="c4r5"></td>
                      <td id ="c5r5"></td>
                      <td id ="c6r5"></td>
                      <td id ="c7r5"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>13:00</td>
                      <td id ="c1r6"></td>
                      <td id ="c2r6"></td>
                      <td id ="c3r6"></td>
                      <td id ="c4r6"></td>
                      <td id ="c5r6"></td>
                      <td id ="c6r6"></td>
                      <td id ="c7r6"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>14:00</td>
                      <td id ="c1r7"></td>
                      <td id ="c2r7"></td>
                      <td id ="c3r7"></td>
                      <td id ="c4r7"></td>
                      <td id ="c5r7"></td>
                      <td id ="c6r7"></td>
                      <td id ="c7r7"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>15:00</td>
                      <td id ="c1r8"></td>
                      <td id ="c2r8"></td>
                      <td id ="c3r8"></td>
                      <td id ="c4r8"></td>
                      <td id ="c5r8"></td>
                      <td id ="c6r8"></td>
                      <td id ="c7r8"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>16:00</td>
                      <td id ="c1r9"></td>
                      <td id ="c2r9"></td>
                      <td id ="c3r9"></td>
                      <td id ="c4r9"></td>
                      <td id ="c5r9"></td>
                      <td id ="c6r9"></td>
                      <td id ="c7r9"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>17:00</td>
                      <td id ="c1r10"></td>
                      <td id ="c2r10"></td>
                      <td id ="c3r10"></td>
                      <td id ="c4r10"></td>
                      <td id ="c5r10"></td>
                      <td id ="c6r10"></td>
                      <td id ="c7r10"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>18:00</td>
                      <td id ="c1r11"></td>
                      <td id ="c2r11"></td>
                      <td id ="c3r11"></td>
                      <td id ="c4r11"></td>
                      <td id ="c5r11"></td>
                      <td id ="c6r11"></td>
                      <td id ="c7r11"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>19:00</td>
                      <td id ="c1r12"></td>
                      <td id ="c2r12"></td>
                      <td id ="c3r12"></td>
                      <td id ="c4r12"></td>
                      <td id ="c5r12"></td>
                      <td id ="c6r12"></td>
                      <td id ="c7r12"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>20:00</td>
                      <td id ="c1r13"></td>
                      <td id ="c2r13"></td>
                      <td id ="c3r13"></td>
                      <td id ="c4r13"></td>
                      <td id ="c5r13"></td>
                      <td id ="c6r13"></td>
                      <td id ="c7r13"></td>
                    </tr>
                    <tr>
                      <td style={style.times}>21:00</td>
                      <td id ="c1r14"></td>
                      <td id ="c2r14"></td>
                      <td id ="c3r14"></td>
                      <td id ="c4r14"></td>
                      <td id ="c5r14"></td>
                      <td id ="c6r14"></td>
                      <td id ="c7r14"></td>
                    </tr>
                  </tbody>
            </Table>

            <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Assign Shifts:</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container assignShiftsModal">
                  <div className="row">
                    <p className="col-md-4">Select an Employee: </p>
                    <select className="col-md-4" id="employee" name="select-employee" onChange={this.changeEmployee} value={this.state.assignEmployee}>
                      <option>-- Select --</option>
                      <option value="Manus">Manus</option>
                      <option value="Rebecca">Rebecca</option>
                    </select>
                  </div>
                  <div className="row">
                    <p className="col-md-4">Select a Date: </p>
                    <select className="col-md-4" id="date" name="select-date" onChange={this.changeDate} value={this.state.assignDate}>
                      <option>-- Select --</option>
                      <option value='sunday'>{this.state.sunDate}</option>
                      <option value='monday'>{this.state.monDate}</option>
                      <option value='tuesday'>{this.state.tuesDate}</option>
                      <option value='wednesday'>{this.state.wedDate}</option>
                      <option value='thursday'>{this.state.thursDate}</option>
                      <option value='friday'>{this.state.friDate}</option>
                      <option value='satday'>{this.state.satDate}</option>
                    </select>
                  </div>
                  <div className="row">
                    <p className="col-md-4">Select a Time: </p>
                    <select className="col-md-4" id="time" name="select-time" onChange={this.changeTime} value={this.state.assignTime}>
                      <option>-- Select --</option>
                      <option value="0800">08:00</option>
                      <option value="0900">09:00</option>
                      <option value="1000">10:00</option>
                      <option value="1100">11:00</option>
                      <option value="1200">12:00</option>
                      <option value="1300">13:00</option>
                      <option value="1400">14:00</option>
                      <option value="1500">15:00</option>
                      <option value="1600">16:00</option>
                      <option value="1700">17:00</option>
                      <option value="1800">18:00</option>
                      <option value="1900">19:00</option>
                      <option value="2000">20:00</option>
                      <option value="2100">21:00</option>
                    </select>
                  </div>
                  <div className="row">
                    <button onClick={this.assignShift}>Assign</button>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={this.closeModal}>Close</button>
              </Modal.Footer>
            </Modal>
          </div>
        </Well>         
      </div>
    );
  }
});
