import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Well, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

  const style = {
    name: {
      color: '#B71C1C',
      fontWeight: 'bold',
    },
    welcomeText: {
      display: 'inline-block',
      textAlign: 'left',
      fontSize: '120%',
    },

    tableCells:{
      fontWeight: 'bold',
      marginRight: '1%',
      width: '11.2%',
      textAlign: 'center',
      padding: '0',
    },

    tableCellsTimes:{
      fontWeight: 'bold',
      marginRight: '1%',
      width: '10%',
      textAlign: 'right',
      padding: '0',
    },

    availButton:{
      margin: '0 auto',
    },
  };

export default React.createClass({
  getInitialState: function () {
    return {
      companyName: "",
    }
  },
  componentWillMount(){
    var companyID = this.param('company');

    if(companyID.length > 0){
      new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + companyID).on('value', function(snap) {
        this.setState({companyName: snap.val().Name,}) 
      }.bind(this));

      
    }
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


  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <div id="appPosition">
          <div className="col-sm-3">
            <div className="well" id="welcomeWell">
              { this.state.companyName.length != 0 ?
                <div id = "welcomeMessage">
                  Welcome to <span id="compName" style={style.name}>{this.state.companyName}</span>.
                  <br/>
                  <br/>
                  **Insert Content Here**
                </div>
                      : <div className="loadingSpinner">
                          <FontAwesome
                              name='spinner'
                              spin
                            /> 
                        </div>}
            </div>
          </div>
            <div className="col-sm-9">
              <div className="well" id="availibilitesWell">
                { this.state.companyName.length != 0 ?
                <div>
                  <h4>Save Your Weekly Availabilities:</h4>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}></div>
                    <div className="col-sm-1" style={style.tableCells}>Monday</div>
                    <div className="col-sm-1" style={style.tableCells}>Tuesday</div>
                    <div className="col-sm-1" style={style.tableCells}>Wednesday</div>
                    <div className="col-sm-1" style={style.tableCells}>Thursday</div>
                    <div className="col-sm-1" style={style.tableCells}>Friday</div>
                    <div className="col-sm-1" style={style.tableCells}>Saturday</div>
                    <div className="col-sm-1" style={style.tableCells}>Sunday</div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>09:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>10:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>11:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>12:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>13:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>14:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>15:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>16:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>17:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>18:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>19:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>20:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <div className="row">
                    <div className="col-sm-1" style={style.tableCellsTimes}>21:00</div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                    <div className="col-sm-1" style={style.tableCells}><input type="checkbox" /></div>
                  </div>
                  <br/>
                  <button style={style.availButton}>Save Availabilities</button>
                </div>
                : <div className="loadingSpinner">
                          <FontAwesome
                              name='spinner'
                              spin
                            /> 
                        </div>}
              </div>
            </div>
          </div>

          <div id="footer"/>    
      </div>

    );
  }
});
