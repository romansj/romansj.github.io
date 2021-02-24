var PAGE_HOME = "about_notes";
var PAGE_LEGAL = "legal2";
var PAGE_ABOUT_US = "about_us";

var current = PAGE_HOME;

//https://stackoverflow.com/a/23853418/4673960
if (typeof(Storage) !== "undefined" && sessionStorage.getItem('pageToShow')) {
  var pageToShow = sessionStorage.getItem('pageToShow');
  current = pageToShow;
}


$(document).ready(function() {

  //load saved page
  if (current === PAGE_HOME) {
    loadAboutNotes();
  } else {
    if (current === PAGE_LEGAL) {
      loadLegal();
    } else if (current === PAGE_ABOUT_US) {
      loadAboutCherry();
    }
  }

  $("#community_placeholder").load("community.html");
  $("#download_placeholder").load("download.html");


  if (typeof(Storage) !== "undefined" && sessionStorage.getItem('scrollTop')) {
    var scr = sessionStorage.getItem('scrollTop');
    // console.log(scr);
    //$(document).scrollTop(scr); works in IE and Edge, not others
    // $('html, body').animate({ scrollTop: scr }, "fast"); //works in Chrome, but has an annoying side-effect.
    //$("html").scrollTop(scr); in ie and Edge

    window.setTimeout(function() {
      // console.log("afTimeOut " + scr);
      $(window).scrollTop(scr);
    }, 100); //works in all. thanks: JamoCA https://github.com/flesler/jquery.scrollTo/issues/164

  }


  var scroll = $(window).scrollTop()
  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('scrollTop', scroll);
  }




  $("#pp").click(function() {
    scrollToTop();
    loadLegal();
  });

  $("#legal").click(function() {
    scrollToTop();
    loadLegal();
  });

  $("#about").click(function() {
    scrollToTop();
    loadAboutCherry();
  });



  $("#home").click(function() {
    scrollToAfterLoad("top");
  });

  $("#home_about").click(function() {
    scrollToAfterLoad("#about");
  });

  $("#home_features").click(function() {
    scrollToAfterLoad("#features");
  });



  $("#community_nav").click(function() {
    scrollToElement("#community", -120);
  });


  $("#download_nav").click(function() {
    scrollToElement("#download", -120);
  });

});


function loadAboutNotes() {
  $("#content_placeholder").load("about_notes.html");
  //current = PAGE_HOME; not needed because already initialized to that value TODO

  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('pageToShow', current);
  }
}

function loadLegal() {
  $("#content_placeholder").load("legal2.html");
  current = PAGE_LEGAL;


  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('pageToShow', current);
  }
}

function loadAboutCherry() {
  $("#content_placeholder").load("about_us.html");
  current = PAGE_ABOUT_US;


  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('pageToShow', current);
  }
}



function scrollToTop() {
  $("html, body").animate({
    scrollTop: 0
  }, "slow");
}

function scrollToElement(where, offset) {
  $('html, body').animate({
    scrollTop: $(where).offset().top + offset
  }, 2000);
}

function scrollToAfterLoad(scrollToWhere) {
  if (current != PAGE_HOME) {
    $("#content_placeholder").load("about_notes.html", function() {
      if (scrollToWhere === "top") scrollToTop();
      else scrollToElement(scrollToWhere, -120);
    });

    current = PAGE_HOME;

  } else {
    if (scrollToWhere === "top") scrollToTop();
    else scrollToElement(scrollToWhere, -120);
  }


  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('pageToShow', current);
  }
}


$(window).scroll(function() {
  var scroll = $(this).scrollTop()

  if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('scrollTop', scroll);
  }
});
