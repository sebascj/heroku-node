var briefcaseApp = angular.module('briefcase', ['ui.bootstrap']);

briefcaseApp.controller('MainCtrl', ['$uibModal', '$anchorScroll','$location', function($uibModal, $anchorScroll, $location) {
  var ctrl = this;
  var scroll_start = 0;
  var startchange = $('#startchange');
  var offset = startchange.offset();
  var windowSize = $(window).width();

  function navOpacity() {
    scroll_start = $(this).scrollTop();
    if(scroll_start - 100 > offset.top || windowSize < 770) {
          $(".navbar-default").css('background-color', '#DFE8E6');
    } else {
          $('.navbar-default').css('background-color', 'transparent');
          $(".nav-item").css("background-color", 'transparent');
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
    monsters: {
      main: 'assets/apps/monsters/monstersMain.jpg',
      related: ['assets/apps/monsters/monstersModal01.jpg', 'assets/apps/monsters/monstersModal02.jpg', 'assets/apps/monsters/monstersModal03.jpg', 'assets/apps/monsters/monstersModal04.jpg']
  }
    // chocolates: {
    //   main: 'http://placehold.it/171x180',
    //   related: ['http://placehold.it/171x180', 'http://placehold.it/171x180', 'http://placehold.it/171x180']
    // },
    // perros: {
    //   main: 'http://placehold.it/171x180',
    //   related: ['http://placehold.it/171x180', 'http://placehold.it/171x180', 'http://placehold.it/171x180']
    // },
    // gatos: {
    //   main: 'http://placehold.it/171x180',
    //   related: ['http://placehold.it/171x180', 'http://placehold.it/171x180', 'http://placehold.it/171x180']
    // }
  };

    ctrl.openModal = function(projectName, projectImages) {

        var project = {
            name: projectName,
            images: projectImages
        };

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'tpl/modal.html',
            controller: 'modalController',
            size: 'lg',
            resolve: {
                project: function () {
                  return project;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            console.log('Modal Open');
        }, function () {
            console.log('Modal Close');
        });
    };

    ctrl.goToLocation = function(location) {
        $anchorScroll.yOffset = 100;
        $location.hash(location);
        console.log($location.hash(location));
        $anchorScroll();
    }
}]);
