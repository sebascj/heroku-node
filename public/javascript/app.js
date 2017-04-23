var briefcaseApp = angular.module('briefcase', ['ui.bootstrap']);

briefcaseApp.controller('MainCtrl', ['$uibModal', '$anchorScroll','$location', function($uibModal, $anchorScroll, $location) {
    'use strict';
    var ctrl = this;
    var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();
    var windowSize = $(window).width();

    function navOpacity() {
        scroll_start = $(window).scrollTop();
        if ((scroll_start - 100) > offset.top || windowSize < 770) {
            $(".navbar-default").css('background-color', '#DFE8E6');
        } else {
            $('.navbar-default').css('background-color', 'transparent');
            $(".nav-item").css("background-color", 'transparent');
        }
    };
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
        var hash = "#" + location;
        var hashOffset = 100;

        $('html, body').animate({
            scrollTop: $(hash).offset().top - hashOffset
        }, 800);
    };
}]);
