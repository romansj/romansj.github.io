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
  })

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
