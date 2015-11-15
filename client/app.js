if (Meteor.isClient){
/*
 * The primary client-side angular application
 *
 * Definition and routes
 *
 */

(function($){


  angular.module( 'app', [ 'angular-meteor' ] );

  angular.module('app')
  	.controller('AppController', ['$scope', '$meteor', '$http', function($scope, $meteor, $http) {

    	window.__ad__ = window.__ad__ || {};
    	var Ad = window.__ad__
    	;

      /*
       * Initialize lifecycle of the controller
       */
  		$scope.initialize = function() {

        $scope.gallery_videos = [];

        setTimeout(function(){
          var elem = document.querySelector('header');
          var headroom = new Headroom(elem);
          headroom.init();

        }, 300);


  		};


      /*
       * Update lifecycle of the controller
       */
  		$scope.update = function() {

  		};

      // Direct down handling (move to directive in the future)
      $scope.direct_down = function(){

        if( location.pathname === "/"){
          $('html, body').animate({
            scrollTop: $("#experience-history").offset().top
          }, 300);

        }else{
          $('html, body').animate({
            scrollTop: $(".article-content").offset().top
          }, 300);

        }

      };


      $scope.select_360_video = function( e ) {
        var $target = $(e.target)
        ;

        if( !$target.hasClass("video") ){
          $target = $target.parents(".video");

        }

        $(".video").removeClass("selected");
        $target.addClass("selected");


      };


      $scope.get_youtube_videos = function(){

        $http({
            method : 'GET',
            url : "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=UUqhpdZe4j_n0-mDW43NTmtg&key=AIzaSyDDDne8gL9SMnCVSOFOD3HfMmqGWvululI",
          }).then(function successCallback(resp) {
            $scope.gallery_videos = resp.data.items;
            console.log("YouTube Response items:",resp.data.items);
            $(".gallery-spinner").hide();

          },function errorCallback(err){
            console.log("YouTube Response Error:",err);
          });



      };




      angular.element(document).ready(function () {
        $scope.initialize();

      });



  }]); // end controller

})(jQuery)

}// Meteor.isClient
