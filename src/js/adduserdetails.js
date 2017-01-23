import React from 'react';
import ReactDOM from 'react-dom';

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
  signOut: function() {
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          window.openAppRoute("/");
      }, function(error) {
          // An error happened.
          alert(error.message);
      });
    },

    addDetails: function() {
      var userID = this.param('id');
      var userEmail = this.param('user');

      var name    = $("#AddDetailsName").val();
      var surname   = $("#AddDetailsSurname").val();
      var address   = $("#AddDetailsAddressL1").val()+", "+$("#AddDetailsAddressL2").val()+", "+$("#AddDetailsAddressL3").val()+", "+$("#AddDetailsCounty").val();
      var dob     = $("#AddDetailsDOB").val();
      var phoneNumber = $("#AddDetailsPhone").val();

      firebase.database().ref('users/' + userID).set({
          Name: name,
          Surname: surname,
          DOB: dob,
          Address: address,
          Phone: phoneNumber,
          Email: userEmail
      });

      $("#AddUserDetails").hide();
      $('#loadingSave').append('<br /><i class="fa fa-5x fa-spinner fa-spin" /><br />');
      var newUrl =encodeURI("/companyregistration?user="+userID);
      window.openAppRoute(newUrl);
    },

  render() {
    return (
      <div>

          <div className="modal fade" id="AddUserModal" role="dialog"> 
            <div className="modal-dialog"> 
              {/* Modal content */} 
              <div className="modal-content">
                <div className="modal-header">
                  <img className="ModalHeader" src="img/logo.png" alt="logo" />
                </div>
                
                <div id="AddUserDetails" className="modal-body LoginModal">
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
                  <button onClick={this.addDetails} className="btn btn-default btn-success"><span className="glyphicon glyphicon-off" /> Save Details</button>
                </div>
                <div id="loadingSave" className="modal-body LoginModal"></div>
                <div className="modal-footer">
                  <p><a onClick={this.signOut}><span className="glyphicon glyphicon-log-out" /> Sign Out</a></p>
                </div>
                
              </div>
            </div>
          </div>
      </div>
    );
  }
});

