import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import moment from 'moment';

var rowMap = {'0.00':'0000','1.00':'0100','2.00':'0200','3.00':'0300','4.00':'0400','5.00':'0500','6.00':'0600','7.00':'0700','8.00':'0800','9.00':'0900','10.00':'1000','11.00':'1100','12.00':'1200','13.00':'1300','14.00':'1400','15.00':'1500','16.00':'1600','17.00':'1700','18.00':'1800','19.00':'1900','20.00':'2000','21.00':'2100','22.00':'2200','23.00':'2300'};

export default React.createClass({
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

    render() {

    	var date = "";
    	var time = this.props.time;
    	var employeeAssigned= "";

    	if(this.props.c==='c1'){
    		date = moment([this.props.year]).day("Sunday").week(this.props.week).format("DD-MM-YYYY");
    	}else if(this.props.c==='c2'){
    		date = moment([this.props.year]).day("Monday").week(this.props.week).format("DD-MM-YYYY");
    	} else if(this.props.c==='c3'){
    		date = moment([this.props.year]).day("Tuesday").week(this.props.week).format("DD-MM-YYYY");
    	} else if(this.props.c==='c4'){
    		date = moment([this.props.year]).day("Wednesday").week(this.props.week).format("DD-MM-YYYY");
    	} else if(this.props.c==='c5'){
    		date = moment([this.props.year]).day("Thursday").week(this.props.week).format("DD-MM-YYYY");
    	} else if(this.props.c==='c6'){
    		date = moment([this.props.year]).day("Friday").week(this.props.week).format("DD-MM-YYYY");
    	} else if(this.props.c==='c7'){
    		date = moment([this.props.year]).day("Saturday").week(this.props.week).format("DD-MM-YYYY");
    	} 
    
    	var shiftRef = new Firebase('https://schedulr-c0fd7.firebaseio.com/shifts/'+this.param('company')+'/allocations/'+date+'/'+rowMap[time]);
		shiftRef.on("child_added", function(dataSnapshot) {

			employeeAssigned = dataSnapshot.val();

		});

		function showModal(val){
			console.log("showModal: " + val);
		}
		var cellID = this.props.r + this.props.c;

    	if(employeeAssigned.length > 0){
    		return (
				<td className={'time-slot-assigned ' + cellID}>  			
					<button> 
						<span id={'message-'+cellID}>{employeeAssigned}</span> 
					</button> 
				</td> 
	        )
    	}else{
    		return (
				<td id={'cell-'+cellID} className={'time-slot-unassigned'}> 
					<button className={'button-'+cellID} onClick={this.props.handler.bind(null, cellID)}> 
						<span className={'message-'+cellID}>Not Assigned</span> 
					</button>
				</td>
	        )
    	}
        
    }
});