import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/*
 * CODE USED TO AUTO ADD DATES TO FIREBASE
 *
 *
    for(var day=0; day<7; day++){
      var shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+param('company')+'/ShiftRequirements/'+day);
      shiftRef.set({  '000' :'No',
                      '100' :'No',
                      '200' :'No',
                      '300' :'No',
                      '400' :'No',
                      '500' :'No',
                      '600' :'No',
                      '700' :'No',
                      '800' :'No',
                      '900' :'No',
                      '1000':'No',
                      '1100':'No',
                      '1200':'No',
                      '1300':'No',
                      '1400':'No',
                      '1500':'No',
                      '1600':'No',
                      '1700':'No',
                      '1800':'No',
                      '1900':'No',
                      '2000':'No',
                      '2100':'No',
                      '2200':'No',
                      '2300':'No'});


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

    function arraymove(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    };


var ShiftRequirementsRow = React.createClass({

  render: function() {
    var _this = this;
    var createCell = function(item, index) {
       var row = _this.props.row;
       var time = (index);

       if(time==24){
        time = "0";
       }

       time = time +"00";

       var assignRequirement = function(row, time, cellID){
        var shiftRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/ShiftRequirements/"+row);


        if($('#requirement-'+cellID).html()=='No'){

          var obj = {};
          obj[time]='1';
          shiftRef.update(obj);

        } else if($('#requirement-'+cellID).html()=='1'){

          var obj = {};
          obj[time]='2';
          shiftRef.update(obj);

        } else {

          var obj = {};
          obj[time]='No';
          shiftRef.update(obj);   

        }

        console.log(_this.props.requirements);
      }


       var cellID = "r"+row+"c"+time;


      if(item==='No'){
        return (              
        <td key={index}>
          <button id={cellID} onClick={assignRequirement.bind(null, row, time, cellID)} className="requirementsButton notRequired">
            <span id={"requirement-"+cellID}>{item}</span>
          </button>
        </td>
          )
      }else if(item==='1'){
        return (              
        <td key={index}>
          <button id={cellID} onClick={assignRequirement.bind(null, row, time, cellID)} className="requirementsButton oneRequired">
            <span id={"requirement-"+cellID}>{item}</span>
          </button>
        </td>
          )
      }else{
        return (
          <td key={index}>
            <button id={cellID} onClick={assignRequirement.bind(null, row, time, cellID)} className="requirementsButton twoRequired">
              <span id={"requirement-"+cellID}>
                {item}
              </span>
            </button>
          </td>
        )
      }
    }

    var requirementsArr = [];
   
    for(var key in this.props.requirements){
      requirementsArr.push(this.props.requirements[key]);
    }
    var elemToMove = requirementsArr.pop();
    requirementsArr.unshift(elemToMove);

    return <tr><td className="tableSideHeading">{this.props.day}</td>{requirementsArr.map(createCell)}</tr>;
  }
});
  

export default React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function () {
    return {
      userType: '',
      maxWeekly: '40',
      maxShift: '8',
      minShift: '4',
      requirements: [],
    }
  },

  componentWillMount(){
    this.bindAsArray(new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/ShiftRequirements"), "requirements");

    this.employeeRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/users/'+param('id'));
    this.employeeRef.on("value", function(dataSnapshot) {
      var userType = '';

      if(dataSnapshot.val().EmployerOf){
        userType = "Employer";
      }else{
        userType = "Employee";
      }

      this.setState({
        userType: userType,
      });
      
    }.bind(this));
  },
   getLink: function(page){
      return "/"+page+"?id="+param('id')+"&company=" + param('company');
    },

    handleMaxWeekly: function(e){
      this.setState({maxWeekly:e.target.value,})
    },

    handleMinShift: function(e){
      this.setState({minShift:e.target.value,})
    },

    handleMaxShift: function(e){
      this.setState({maxShift:e.target.value,})
    },

    updateMaxWeekly: function(){
      this.constraintRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/constraints");
      this.constraintRef.update({
        MaxWeekly: this.state.maxWeekly,
      });
    }, 

    updateMinShift: function(){
      this.constraintRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/constraints");
      this.constraintRef.update({
        MinShift: this.state.minShift,
      });
    }, 

    updateMaxShift: function(){
      this.constraintRef = new Firebase("https://schedulr-c0fd7.firebaseio.com/companies/"+param('company')+"/constraints");
      this.constraintRef.update({
        MaxShift: this.state.maxShift,
      });
    }, 


  render() {
    return (
      <div>
        <div>{this.props.children}</div>
          <div id="appPosition">
            {this.state.userType==='Employer' ?
              <div>
                <Well id="schedulingConstraints">
                  <legend><h4>Scheduling Constraints:</h4></legend>
                  <table>
                    <tbody>
                      <tr>
                        <td className="constraintInfo">Work Week Maximum [in hrs]:</td> 
                        <td className="constraintField"><input type="text" onChange={this.handleMaxWeekly} value={this.state.maxWeekly} className="inputFields"/></td>
                        <td className="constraintButton"><button onClick={this.updateMaxWeekly}>Update</button></td>
                      </tr>
                      <tr>
                        <td className="constraintInfo">Shift Length Minimum [in hrs]:</td> 
                        <td className="constraintField"><input type="text" onChange={this.handleMinShift} value={this.state.minShift} className="inputFields"/></td>
                        <td className="constraintButton"><button onClick={this.updateMinShift}>Update</button></td>
                      </tr>
                      <tr>
                        <td className="constraintInfo">Shift Length Maximum [in hrs]:</td> 
                        <td className="constraintField"><input type="text" onChange={this.handleMaxShift} value={this.state.maxShift} className="inputFields"/></td>
                        <td className="constraintButton"><button onClick={this.updateMaxShift}>Update</button></td>
                      </tr>
                    </tbody>
                  </table>
                </Well>
                <Well id="holidaysPending">
                  <legend><h4>Pending Holidays:</h4></legend>
                  <p>**Holidays to be confirmed**</p>
                </Well>                
                <Well id="shiftRequirements">
                  <legend><h4>Shift Requirements:</h4></legend>
                  <div id="updateRequirements">
                    <table>
                      <tbody>
                        <tr>
                          <td className="tableHeaders"></td>
                          <td className="tableHeaders">00:00</td>
                          <td className="tableHeaders">01:00</td>
                          <td className="tableHeaders">02:00</td>
                          <td className="tableHeaders">03:00</td>
                          <td className="tableHeaders">04:00</td>
                          <td className="tableHeaders">05:00</td>
                          <td className="tableHeaders">06:00</td>
                          <td className="tableHeaders">07:00</td>
                          <td className="tableHeaders">08:00</td>
                          <td className="tableHeaders">09:00</td>
                          <td className="tableHeaders">10:00</td>
                          <td className="tableHeaders">11:00</td>
                          <td className="tableHeaders">12:00</td>
                          <td className="tableHeaders">13:00</td>
                          <td className="tableHeaders">14:00</td>
                          <td className="tableHeaders">15:00</td>
                          <td className="tableHeaders">16:00</td>
                          <td className="tableHeaders">17:00</td>
                          <td className="tableHeaders">18:00</td>
                          <td className="tableHeaders">19:00</td>
                          <td className="tableHeaders">20:00</td>
                          <td className="tableHeaders">21:00</td>
                          <td className="tableHeaders">22:00</td>
                          <td className="tableHeaders">23:00</td>
                        </tr>
                        <ShiftRequirementsRow row={0} day={'Monday'}    requirements={this.state.requirements[0]} />
                        <ShiftRequirementsRow row={1} day={'Tuesday'}   requirements={this.state.requirements[1]} />
                        <ShiftRequirementsRow row={2} day={'Wednesday'} requirements={this.state.requirements[2]} />
                        <ShiftRequirementsRow row={3} day={'Thursday'}  requirements={this.state.requirements[3]} />
                        <ShiftRequirementsRow row={4} day={'Friday'}    requirements={this.state.requirements[4]} />
                        <ShiftRequirementsRow row={5} day={'Saturday'}  requirements={this.state.requirements[5]} />
                        <ShiftRequirementsRow row={6} day={'Sunday'}    requirements={this.state.requirements[6]} />
                      </tbody>
                    </table>
                  </div>
                </Well>
              </div>
            : 
              <div>
                {this.state.userType==='Employee' ?
                <Well id="incorrectPermissions">
                  <h1>Error 403</h1>
                  <h3>You do not have permission <FontAwesome name='hand-paper-o '/> </h3> 
                  <br/>
                  <p>Please navigate back to <Link to={this.getLink('home')}>home</Link>.</p>
                </Well> : 

                  <div className="loadingSpinner">
                    <FontAwesome
                        name='spinner'
                        spin
                      /> 
                  </div>

                 }
              </div>
          } 
          <div id="footer"/>   
        </div>
      </div>

    );
  }
});
