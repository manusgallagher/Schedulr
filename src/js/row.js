import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import ShiftStatus from './shift-status';

const style = {
    times:{
      fontWeight: 'bold',
      textAlign: 'center',
      verticalAlign:'middle',
    },
  };



export default React.createClass({

    render() {
            
        return (
            <tr>
                <td style={style.times}>{this.props.time}</td>
                <ShiftStatus handler={this.props.handler} time={this.props.time} week={this.props.week} year={this.props.year} r={this.props.r} c={"c1"} />
                <ShiftStatus handler={this.props.handler} time={this.props.time} week={this.props.week} year={this.props.year} r={this.props.r} c={"c2"} />
                <ShiftStatus handler={this.props.handler} time={this.props.time} week={this.props.week} year={this.props.year} r={this.props.r} c={"c3"} />
                <ShiftStatus handler={this.props.handler} time={this.props.time} week={this.props.week} year={this.props.year} r={this.props.r} c={"c4"} />
                <ShiftStatus handler={this.props.handler} time={this.props.time} week={this.props.week} year={this.props.year} r={this.props.r} c={"c5"} />
                <ShiftStatus handler={this.props.handler} time={this.props.time} week={this.props.week} year={this.props.year} r={this.props.r} c={"c6"} />
                <ShiftStatus handler={this.props.handler} time={this.props.time} week={this.props.week} year={this.props.year} r={this.props.r} c={"c7"} />
            </tr>
        )
    }
});