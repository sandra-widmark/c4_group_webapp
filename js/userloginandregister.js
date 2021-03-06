//Register new user

var ref = new Firebase("https://fro15-c4-webapp.firebaseio.com");
$("#confirm-registration-btn").on("click", function() {
  event.preventDefault();
  var username = $("#username-registration-input").val();
  var email = $("#email-registration-input").val();
  var password = $("#password-registration-input").val();
  ref.createUser({
    email    : email,
    password : password
  }, function(error, userData) {
    if (error) {
      $("#register-message").text(error);
    } else {
      ref.authWithPassword({
        email    : email,
        password : password
      }, function(error, authData) {
        if (error) {
          $("#register-message").text(error);
        } else {
          var userID = authData.uid;
          ref.child('users').child(userID).set({username: username, email: email});
          window.location.replace("loggedin.html");
        }
      });
    }
  });
});

//Login user

var ref = new Firebase("https://fro15-c4-webapp.firebaseio.com");
$("#sign-in-btn").on("click", function() {
  event.preventDefault();
  var email = $("#email-input").val();
  var password = $("#password-input").val();
  ref.authWithPassword({
    email    : email,
    password : password
  }, function(error, authData) {
    if (error) {
      $("#login-message").text(error);
    } else {
      window.location.replace("loggedin.html");
    }
  });
});

// Remove error message on input (register)
$(".registration-form").on("input", function() {
    $("#register-message").empty();
});

// Remove error message on input (login)
$(".login-form").on("input", function() {
    $("#login-message").empty();
});

/*
//log out user
ref.unauth();
*/
