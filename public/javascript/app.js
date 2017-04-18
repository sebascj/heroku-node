var briefcaseApp = angular.module('briefcase', ['ui.bootstrap']);

briefcaseApp.controller('MainCtrl', ['$uibModal', function($uibModal) {
  var ctrl = this;
  var scroll_start = 0;
  var startchange = $('#startchange');
  var offset = startchange.offset();
  var windowSize = $(window).width();

  setTimeout(function(){
    $(".wrapper").show();
  },200);

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

  $( "#target" ).submit(function( event ) {
    $.ajax({
      type: "POST",
      url: '/sayHello',
      data: {example: "example"},
      success: function(data){
        console.log(data);
      },
    });
    event.preventDefault();
  });

  ctrl.apps = {
    chocolates: "http://placehold.it/171x180",
    monstruos: "http://placehold.it/171x180",
    bicicletas: "http://placehold.it/171x180",
    gatos: "http://placehold.it/171x180",
    perros: "http://placehold.it/171x180",
    casas: "http://placehold.it/171x180",
    edificios: "http://placehold.it/171x180",
    carros: "http://placehold.it/171x180"
  }

  ctrl.openModal = function(name) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'tpl/modal.html',
      controllerAs: ctrl,
      size: 'lg'
    });
    modalInstance.result.then(function (selectedItem) {
      console.log('Modal Open');
    }, function () {
      console.log('Modal Close');
    });
  };

}]);

// });
