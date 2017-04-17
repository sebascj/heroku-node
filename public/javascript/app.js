$(document).ready(function(){
  setTimeout(function(){
    $(".wrapper").show();
  },200);
  var scroll_start = 0;
  var startchange = $('#startchange');
  var offset = startchange.offset();
  var windowSize = $(window).width();

  function navOpacity() {
    scroll_start = $(this).scrollTop();
    if(scroll_start > offset.top || windowSize < 1200) {
          $(".navbar-default").css('background-color', '#ffffff');
    } else {
          $('.navbar-default').css('background-color', 'transparent');
    }
  }
  navOpacity();

  $(window).resize(function(){
    windowSize = $(window).width();
    navOpacity();

  });

  if (startchange.length){
    $(document).scroll(function() {
        navOpacity();
     });
  }









});
