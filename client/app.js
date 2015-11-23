if (Meteor.isClient){
/*
 * The primary client-side angular application
 *
 * Definition and routes
 *
 */
(function($){


  angular.module( 'cla', [ 'angular-meteor', 'ngMaterial' ] );

  angular.module('cla')
  	.controller('AppController', ['$scope', '$meteor', '$http', function($scope, $meteor, $http) {

    	window.__ad__ = window.__ad__ || {};
    	var Ad = window.__ad__
    	;

      /*
       * Initialize lifecycle of the controller
       */
  		$scope.initialize = function() {

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


      angular.element(document).ready(function () {
        $scope.initialize();

      });



  }]); // end controller


  /*
   * Works controller for browsing works index
   *
   */
  angular.module('cla')
  	.controller('WorksController', ['$scope', '$meteor', 'Api', function($scope, $meteor, Api) {

    	window.__ad__ = window.__ad__ || {};
    	var Ad = window.__ad__
    	;

      /*
       * Initialize lifecycle of the controller
       */
  		$scope.initialize = function() {

        $scope.authors = Api.get_authors( "latin", "perseus" )

  		};


      /*
       * Update lifecycle of the controller
       */
  		$scope.update = function() {

  		};


      angular.element(document).ready(function () {
        $scope.initialize();

      });



  }]); // end controller

/*
 * Api.js
 *
 * Access the JSON API
 *
 */
angular.module('cla')

	.factory( 'Api', function ( $http ) {
		'use strict';

		var Api = {

			get : function( query, callback ){


				// check get_posts_lock to limit number of queries sent via instant search
				// get commentary data
				console.log( "GET params:", query);
				$http({
						method : 'JSONP',
						url : 'http://192.168.1.218:5000/query',
						params : query

					})
					.success( function( resp ) {
						console.log("API Response:", resp);

						if ( typeof callback !== "undefined" ) {
							callback( resp );
						}

					}).error( function( err ) {

						console.log("API Error", err);

					});

			},


			get_authors : function( language, corpus, callback ){


				// check get_posts_lock to limit number of queries sent via instant search
				// get commentary data
				console.log( "GET authors:", language, corpus);
				$http({
						method : 'JSONP',
						url : 'http://localhost:5000/lang/' + language + "/corpus/" + corpus + "/authors",
            params: {
              callback : "JSON_CALLBACK"

            }

					})
					.then( function( resp ) {
            debugger;
						console.log("API Response:", resp);

						if ( typeof callback !== "undefined" ) {
							callback( resp );
						}

					}, function( err ) {

						console.log("API Error", err );

					});

			}


		}

		return Api;

	});

})(jQuery)

}// Meteor.isClient
