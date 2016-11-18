$(document).ready(function () {
    pageSetup();         
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	console.log("Logged in");
    	
    }else {
    	console.log("Not Logged in");
    }
});

$(window).on('hashchange', pageSetup);

function pageSetup(){
    var url = window.location.href;
    var lastSegment = url.split('/').pop();

    if (lastSegment == "home"){
        $('#AuthenticationModal').modal("hide");
    }else{
         $('#AuthenticationModal').modal({
          backdrop: 'static',
          keyboard: false
        });
    }
}