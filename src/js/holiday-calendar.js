import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import moment from 'moment';
import DatePicker from 'react-datepicker';

export default React.createClass({
    getInitialState: function () {
        return {
            startDate:  moment(),
            datesPending: [],
            datesApproved: [],
        }
    },
    componentWillMount(){
        var userID = this.param("id");
        var companyID = this.param("company");
        var exists = false;

        this.unapprovedHolidayRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+companyID+'/holidays/pending/');

        this.unapprovedHolidayRef.child(userID).once('value', function(snapshot) {
            exists = (snapshot.val() !== null);
            this.handlePrevReqShifts(userID, companyID, exists);
          }.bind(this));

        this.approvedHolidayRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+companyID+'/holidays/approved/');

        this.approvedHolidayRef.child(userID).once('value', function(snapshot) {
            exists = (snapshot.val() !== null);
            this.handlePrevApprShifts(userID, companyID, exists);
          }.bind(this));
    },

    handlePrevReqShifts: function(userID, companyID, event){
        if(event){            

            this.unapprovedHolidayRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+companyID+'/holidays/pending/'+userID);
            this.unapprovedHolidayRef.once("value", function(dataSnapshot) {
                this.setState({
                  datesPending: dataSnapshot.val().dates,  
                });
            }.bind(this));
        }
    },
    handlePrevApprShifts: function(userID, companyID, event){
        if(event){            

            this.approvedHolidayRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+companyID+'/holidays/approved/'+userID);
            this.approvedHolidayRef.once("value", function(dataSnapshot) {
                this.setState({
                  datesApproved: dataSnapshot.val().dates,  
                });
            }.bind(this));
        }
    },
    handleChange: function(date) {
        console.log(date);
        this.setState({
            startDate: date
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

    requestHoliday: function(){
        var userID = this.param("id");
        var companyID = this.param("company");
        var date = this.state.startDate.format("DD-MM-YYYY");
        var reqHolidays = this.state.datesPending;
        var appHolidays = this.state.datesApproved;

        if(reqHolidays.includes(date) || appHolidays.includes(date)){
            console.log("NOPE");
        }else{
            reqHolidays.push(date);
            this.setState({
                datesPending: reqHolidays,
            });
        }



        this.holidayRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/'+companyID+'/holidays/pending/'+userID);
        this.holidayRef.update({
          dates: this.state.datesPending,
        });
        

        
    },
    render() {
            
        return (
            <div>
               <DatePicker
                dateFormat="DD-MM-YYYY"
                selected={this.state.startDate}
                onChange={this.handleChange}
              />

              <button onClick={this.requestHoliday}>Request</button>
            </div>
        )   
    }
});