var globalUser = "";

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	console.log("Logged in");
    	globalUser = user;

        new Firebase('https://schedulr-c0fd7.firebaseio.com/users/' + user.uid).once('value', function(snap) {
            if (snap.val() == null) {
            	//--Closing Signup and Login Modals--
            	console.log("You Need to Add User Details...");
            	$('#loginModal').modal("hide");
            	$('#signupModal').modal("hide");
            	$('#companyModal').modal("hide");
            	$('#addDetailsModal').modal({
				  backdrop: 'static',
				  keyboard: false
				});
				

            }else{
            	console.log("You Don't Need to Add User Details...");
            }
        });

    }else {
    	console.log("Not Logged in");
    }
});


$('#loginModal').modal({
  backdrop: 'static',
  keyboard: false
});

$("#signup-link").click(
	function(){
		$('#loginModal').modal('hide');
		$('#signupModal').modal({
			backdrop: 'static',
			keyboard: false
		});
	}
);

$("#login-link").click(
	function(){
		$('#signupModal').modal('hide');
		$('#loginModal').modal({
			backdrop: 'static',
			keyboard: false
		});
	}
);

$("#loginBtn").click(
	function(){
		var email 	= $("#loginemail").val();
		var pswd 	= $("#loginpswd").val();

		firebase.auth().signInWithEmailAndPassword(email, pswd).catch(function(error) {
            $("#loginError").show().text(error.message);
        });
	}
);

$("#AddDetailsBtn").click(
	function(){
		var name 		= $("#AddDetailsName").val();
		var surname 	= $("#AddDetailsSurname").val();
		var address		= $("#AddDetailsAddressL1").val()+", "+$("#AddDetailsAddressL2").val()+", "+$("#AddDetailsAddressL3").val()+", "+$("#AddDetailsCounty").val();
		var dob 		= $("#AddDetailsDOB").val();
		var phoneNumber = $("#AddDetailsPhone").val();

		firebase.database().ref('users/' + globalUser.uid).set({
            Name: name,
            Surname: surname,
            DOB: dob,
            Address: address,
            Phone: phoneNumber,
            Email: globalUser.email
        });

	}
);

$("#signupBtn").click(
	function() {
        $("#loginError").hide();

        var email = $("#signupemail").val();
        var password = $("#signuppsw").val();
        var confPass = password; //$("#confpsw").val();

        if (confPass != password) {
            $("#signUpError").show().text("Passwords Don't Match");
            $("#confpsw").val("");
        } else if (email == "") {
            $("#signUpError").show().text("Fill in All Required Fields");
        } else if (confPass == "" || password == "") {
            $("#signUpError").show().text("Fill in All Required Fields");
        } else {

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                $("#signUpError").show().text(error.message);
            });

            $("#signupemail").val("");
            $("#signuppsw").val("");
            $("#confpsw").val("");
        }
    }
);

$("#signoutlink").click(
	function(){
		firebase.auth().signOut().then(function() {
            // Sign-out successful.

        }, function(error) {
            // An error happened.
            alert(error.message);
        });
	}
);