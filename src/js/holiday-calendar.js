import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import moment from 'moment';

export default React.createClass({

    render() {

            
        return (
            <div>
                <p>{'month = ' + (this.props.month+1)}</p>
                <p>{'year = ' + this.props.year}</p>
                <p>{'num of Days = ' + moment([this.props.year, this.props.month]).daysInMonth()}</p>
            </div>
        )   
    }
});