import React from 'react';
import ReactDOM from 'react-dom';


var UserDetails = React.createClass({
  render() {
    return (
    	<div>	
		    	<div className="addDetails-container">
		        {/* Modal */}
		        <div className="modal fade" id="addDetailsModal" role="dialog">
		          <div className="modal-dialog">
		            {/* Modal content*/}
		            <div className="modal-content">
		              <div className="modal-header">
		                <img className="ModalHeader" src="img/logo.png" alt="logo" />
		              </div>
		              <div className="modal-body LoginModal">
		                <p id="AdditionalInputError" />
		                <table>
		                  <tbody><tr>
		                      <td className="AdditionalDetailsHeader">*First Name:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <input type="text" className="form-control" id="AddDetailsName" placeholder="First Name..." />
		                        </div>
		                      </td>
		                      <td className="AdditionalDetailsHeader">*Address Line 1:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <input type="text" className="form-control" id="AddDetailsAddressL1" placeholder="Address Line 1..." />
		                        </div>
		                      </td>
		                    </tr>
		                    <tr>
		                      <td className="AdditionalDetailsHeader">*Surname:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <input type="text" className="form-control" id="AddDetailsSurname" placeholder="Surname..." />
		                        </div>
		                      </td>
		                      <td className="AdditionalDetailsHeader">*Address Line 2:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <input type="text" className="form-control" id="AddDetailsAddressL2" placeholder="Address Line 2..." />
		                        </div>
		                      </td>
		                    </tr>
		                    <tr>
		                      <td className="AdditionalDetailsHeader">*DOB:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <input type="date" className="form-control" id="AddDetailsDOB" />
		                        </div>
		                      </td>
		                      <td className="AdditionalDetailsHeader">Address Line 3:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <input type="text" className="form-control" id="AddDetailsAddressL3" placeholder="Address Line 3..." />
		                        </div>
		                      </td>
		                    </tr>
		                    <tr>
		                      <td className="AdditionalDetailsHeader">*Phone Number:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <input type="text" className="form-control" id="AddDetailsPhone" placeholder="Phone Number..." />
		                        </div>
		                      </td>
		                      <td className="AdditionalDetailsHeader">*County:</td>
		                      <td>
		                        <div className="form-group AdditonalInfoInput">
		                          <select name="county" id="AddDetailsCounty" className="form-control" placeholder="County...">
		                            <option>-- Select a County --</option>
		                            <option value="Antrim">Antrim</option>
		                            <option value="Armagh">Armagh</option>
		                            <option value="Carlow">Carlow</option>
		                            <option value="Cavan">Cavan</option>
		                            <option value="Clare">Clare</option>
		                            <option value="Cork">Cork</option>
		                            <option value="Derry">Derry</option>
		                            <option value="Donegal">Donegal</option>
		                            <option value="Down">Down</option>
		                            <option value="Dublin">Dublin</option>
		                            <option value="Fermanagh">Fermanagh</option>
		                            <option value="Galway">Galway</option>
		                            <option value="Kerry">Kerry</option>
		                            <option value="Kildare">Kildare</option>
		                            <option value="Kilkenny">Kilkenny</option>
		                            <option value="Laois">Laois</option>
		                            <option value="Leitrim">Leitrim</option>
		                            <option value="Limerick">Limerick</option>
		                            <option value="Longford">Longford</option>
		                            <option value="Louth">Louth</option>
		                            <option value="Mayo">Mayo</option>
		                            <option value="Meath">Meath</option>
		                            <option value="Monaghan">Monaghan</option>
		                            <option value="Offaly">Offaly</option>
		                            <option value="Roscommon">Roscommon</option>
		                            <option value="Sligo">Sligo</option>
		                            <option value="Tipperary">Tipperary</option>
		                            <option value="Tyrone">Tyrone</option>
		                            <option value="Waterford">Waterford</option>
		                            <option value="Westmeath">Westmeath</option>
		                            <option value="Wexford">Wexford</option>
		                            <option value="Wicklow">Wicklow</option>
		                          </select>
		                        </div>
		                      </td>
		                    </tr>
		                  </tbody></table>
		                <br />			            
		                <button id="AddDetailsBtn" className="btn btn-default btn-success"><span className="glyphicon glyphicon-off" /> Save Details</button>
		              </div>
		              <div className="modal-footer">
		                <p><a className="signoutlink"><span className="glyphicon glyphicon-log-out" /> Sign Out</a></p>
		              </div>
		            </div>
		          </div>
		        </div> 
      		</div>
      	</div>
    );
  }
});

ReactDOM.render(<UserDetails />, document.getElementById('addUserDetails'));
