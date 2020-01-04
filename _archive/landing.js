var visible = false;

document.addEventListener("DOMContentLoaded", function() {
  var iconItem = document.getElementById("icon_item");

  iconItem.addEventListener("click", function() {
    if (document.body.clientWidth < 700) hideShowMenu();
  });

  // if (document.body.clientWidth <= 700) {
  //   if (visible) {
  //     hideShowMenu();
  //   }
  // }


  window.addEventListener("resize", function(event) {
    console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight + ' high');
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



  // There are many ways to pick a DOM node; here we get the form itself and the email
  // input box, as well as the span element into which we will place the error message.

  const form = document.getElementsByTagName('form')[0];
  const email = document.getElementById('mail');
  const error = document.querySelector('.error');

  email.addEventListener("input", function(event) {
    // Each time the user types something, we check if the
    // email field is valid.
    if (email.validity.valid) {
      // In case there is an error message visible, if the field
      // is valid, we remove the error message.
      error.innerHTML = ""; // Reset the content of the message
      error.className = "error"; // Reset the visual state of the message
    }
  }, false);
  form.addEventListener("submit", function(event) {
    // Each time the user tries to send the data, we check
    // if the email field is valid.
    if (!email.validity.valid) {

      // If the field is not valid, we display a custom
      // error message.
      error.innerHTML = "I expect an e-mail.";
      error.className = "error active";
      // And we prevent the form from being sent by canceling the event
      event.preventDefault();
    }
  }, false);

});


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
