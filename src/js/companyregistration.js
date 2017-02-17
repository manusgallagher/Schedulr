import React from 'react';
import ReactDOM from 'react-dom';

export default React.createClass({
	componentDidMount(){
		$('#joinACompany').hide();
		$('#createACompany').hide();
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
	makeid: function()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 7; i++ ){
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }

	    return text;
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
	joinCompany: function(){
		console.log("join");
		$('#companyChoice').hide();
		$('#joinACompany').show();
	},
	createCompany: function(){
		console.log("create");
		$('#companyChoice').hide();
		$('#createACompany').show();
	},
	submitID: function(){

		var enteredID = $("#companyID").val();
		var UID = this.param('id');
		if(enteredID.length > 0){
			 new Firebase('https://schedulr-c0fd7.firebaseio.com/companies/' + enteredID).once('value', function(companysnap) {
				if(companysnap.val()!=null){
					$("#idError").hide();
					

					new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + UID).once('value', function(usersnap) {
						var now = new Date().toUTCString();

						/* Posting into the 'companies' tree
						 * the New Employee.
						 */
						firebase.database().ref('companies/' + enteredID +'/Employees/'+UID).set({
				          Name: usersnap.val().Name+" "+usersnap.val().Surname,
				          Joined: now,
				      	});
						/* Posting into the 'users' tree
						 * the New Employment.
						 */
				      	firebase.database().ref('users/' +UID+'/EmployeeOf').set({
				          Name: companysnap.val().Name,
				          Joined: now,
				          UniqueID: enteredID
				      	});
					});
					setTimeout(function (){
	                  window.openAppRoute("/home?id="+UID+"?company="+enteredID);
	                }, 3000);	
				}else{
					$("#idError").empty().append("<b>Error:</b> <br/>"+enteredID+" is not a valid CompanyID.");
				}				
			 });
		}		
	},

	saveCompany: function(){
		var name = $('#CompanyName').val();
		var email = $('#CreateCompanyEmail').val();
		var number = $('#CreateCompanyNumber').val();
		var type = $('#CreateCompanyType').val();
		var address = $('#CreateCompanyAddressL1').val() + ", " +$('#CreateCompanyAddressL2').val() + ", " +$('#CreateCompanyAddressL3').val() + ", " +$('#CreateCompanyCounty').val() +".";
		
		var now = new Date().toUTCString();
		var UID = this.param('id');
		var generatedId = this.makeid();

		new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + UID).once('value', function(companysnap) {
			firebase.database().ref('companies/' + generatedId).set({
	          Name: name,
	          Email: email,
	          Number: number,
	          Type: type,
	          Address: address
	      	});

	      	firebase.database().ref('companies/' + generatedId + '/Employer').set({
	          Name: companysnap.val().Name + " " + companysnap.val().Surname,
	          UID: UID,
	          Created: now
	      	});

	      	firebase.database().ref('users/' + UID + '/EmployerOf').set({
	          Name: name,
	          UniqueID: generatedId,
	          Created: now
	      	});

	      	window.openAppRoute("/home?id="+UID+"?company="+generatedId)
		});
	},

  render() {
    return (
      <div>

      	<div className="modal fade" id="CompanyRegistrationModal" role="dialog"> 
	        <div className="modal-dialog"> 
	          {/* Modal content */} 
	          <div className="modal-content">
	            <div className="modal-header">
	              <img className="ModalHeader" src="img/logo.png" alt="logo" />
	            </div>
	            
	            <div className="modal-body LoginModal">
			<div id="companyChoice">
				<a onClick={this.createCompany} className="btn btn-lg btn-primary createCompany"><span className="glyphicon glyphicon-plus" /> Create Company</a>{' '}
				<a onClick={this.joinCompany} className="btn btn-lg btn-primary joinCompany"><span className="glyphicon glyphicon-cloud" /> Join Company</a>
			</div>
			<div id="joinACompany">
				<p id="idError"></p>
				<input id="companyID" type="text" className="form-control" placeholder="Unique ID..." /><br />
				<button onClick={this.submitID} className="btn btn-default btn-success"><i className="fa fa-paper-plane-o" /> Submit</button>
			</div>
			<div id="createACompany">
				<table>
	              <tbody><tr>
	                  <td className="CreateCompanyHeader">*Company Name:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <input type="text" className="form-control" id="CompanyName" placeholder="Company Name..." />
	                    </div>
	                  </td>
	                  <td className="CreateCompanyHeader">*Address Line 1:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <input type="text" className="form-control" id="CreateCompanyAddressL1" placeholder="Address Line 1..." />
	                    </div>
	                  </td>
	                </tr>
	                <tr>
	                  <td className="CreateCompanyHeader">*Email:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <input type="text" className="form-control" id="CreateCompanyEmail" placeholder="Email..." />
	                    </div>
	                  </td>
	                  <td className="CreateCompanyHeader">*Address Line 2:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <input type="text" className="form-control" id="CreateCompanyAddressL2" placeholder="Address Line 2..." />
	                    </div>
	                  </td>
	                </tr>
	                <tr>
	                  <td className="CreateCompanyHeader">*Phone Number:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <input type="text" className="form-control" id="CreateCompanyNumber" placeholder="Phone Number..." />
	                    </div>
	                  </td>
	                  <td className="CreateCompanyHeader">Address Line 3:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <input type="text" className="form-control" id="CreateCompanyAddressL3" placeholder="Address Line 3..." />
	                    </div>
	                  </td>
	                </tr>
	                <tr>
	                  <td className="CreateCompanyHeader">*Type:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <select name="county" id="CreateCompanyType" className="form-control">
	                        <option>-- Select a Type --</option>
	                        <option value="pub">Pub</option>
	                        <option value="restaurant">Restaurant</option>
	                      </select>
	                    </div>
	                  </td>
	                  <td className="CreateCompanyHeader">*County:</td>
	                  <td>
	                    <div className="form-group CreateCompanyInput">
	                      <select name="county" id="CreateCompanyCounty" className="form-control">
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
		            <button onClick={this.saveCompany} className="btn btn-default btn-success"><i className="fa fa-building-o" aria-hidden="true"/> Create Company</button>
			</div>
		</div>
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
