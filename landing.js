var visible = false;

document.addEventListener("DOMContentLoaded", function() {
  var iconItem = document.getElementById("icon_item");

  iconItem.addEventListener("click", function() {
    if (document.body.clientWidth < 700) hideShowMenu();
  });

  var textItem = document.getElementsByClassName("menu-text");

  for (i = 0; i < textItem.length; i++) {
    textItem[i].addEventListener("click", function() {
      if (document.body.clientWidth < 700) {
        if (visible) {
          hideShowMenu();
        }
      };
    });
  }


  window.addEventListener("resize", function(event) {
    //console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight + ' high');
    if (document.body.clientWidth >= 700) {
      if (!visible) {
        hideShowMenu();
      }

    } else {
      if (visible) {
        hideShowMenu();
      }
    }
  });


  // const form = document.getElementsByTagName('form')[0];
  // const email = document.getElementById('mail');
  // const error = document.querySelector('.error');
  //
  // email.addEventListener("input", function(event) {
  //
  //   if (email.validity.valid) {
  //
  //     error.innerHTML = "";
  //     error.className = "error";
  //   }
  // }, false);
  //
  // form.addEventListener("submit", function(event) {
  //
  //   if (!email.validity.valid) {
  //     error.innerHTML = "I expect an e-mail.";
  //     error.className = "error active";
  //     event.preventDefault();
  //   }
  // }, false);

});

function validateMyForm() {
  const form = document.getElementsByTagName('form')[0];
  const email = document.getElementById('mail');
  const error = document.querySelector('.error');
  const name = document.getElementById("name");
  const message = document.getElementById('msg');

  var emailValue = email.value;
  var nameValue = name.value;
  var msgValue = message.value;

  //https://stackoverflow.com/a/32686261/4673960
  var emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  var nameOK = nameValue.length >= 2;
  var mssgOK = msgValue.length >= 10;


  if (emailOK && nameOK && mssgOK) {
    if (document.getElementById('error_name')) {
      document.getElementById('error_name').style.display = "none";
    }

    alert("Success, message sent!")

    email.value = "";
    name.value="";
 message.value="";
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://naivist.net/form");
    // xhr.onload = function(event) {
    //   alert("Success, server responded with: " + event.target.response); // raw response
    //
    //
    //   document.getElementById('response_placeholder').innerHTML = event.target.response;
    // };
    // // or onerror, onabort
    // var formData = new FormData(document.getElementById("form"));
    // xhr.send(formData);

  } else {

    var errorMessage = "";

    if (!nameOK) {
      errorMessage += "Please enter your name";
    }

    if (!emailOK) {
      if (errorMessage.length > 0) errorMessage += "\n";
      errorMessage += "Please enter a valid email address";
    }

    if (!mssgOK) {
      if (errorMessage.length > 0) errorMessage += "<br>";
      errorMessage += "Your message should be at least 10 characters long";
    }

    showError(errorMessage);
  }

}


function showError(text) {
  var errorDiv = document.getElementById('error');
  var errorP = document.getElementById('error_name')

  if (errorP) {
    errorP.style.display = "block";
    errorP.innerHTML = text;
  } else {
    var newP = document.createElement('p');
    var g = errorDiv.appendChild(newP);
    g.innerHTML = text;
    g.id = 'error_name';
  }
}


function hideShowMenu() {
  var x = document.getElementsByClassName("menu-text");
  for (i = 0; i < x.length; i++) {
    if (!visible) {
      x[i].style.display = "block";
    } else {
      x[i].style.display = "none";
    }
  }
  visible = !visible;
}
