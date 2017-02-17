import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import moment from 'moment';

export default React.createClass({
    render() {
        var month = this.props.month;
        var year = this.props.year;
        var numOfDays = moment([this.props.year, this.props.month]).daysInMonth();
        var htmlString = "<tr><td> 1 </td><td> 2 </td><td> 3 </td><td> 4 </td><td> 5 </td></tr>"


        var calendarCells = (htmlString);
            
        return (
            <div>
                <table>
                    <tbody>
                        {calendarCells} 
                    </tbody>
                </table>
            </div>
        )   
    }
});