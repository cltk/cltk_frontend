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
  /*
  	.run([ '$rootScope', '$state', '$stateParams',
  		function ($rootScope,	 $state,	 $stateParams) {

  		// It's very handy to add references to $state and $stateParams to the $rootScope
  		// so that you can access them from any scope within your applications.For example,
  		// <li ng-="{ active: $state.includes('contacts.list') }"> will set the <li>
  		// to active whenever 'contacts.list' or one of its decendents is active.
  		$rootScope.$state = $state;
  		$rootScope.$stateParams = $stateParams;

  		$rootScope.$on('$stateChangeError', function(event) {
  			event.preventDefault();
  			return $state.go( "error" );
  		});


  	}])
  	.config( function( $locationProvider, $interpolateProvider ){
  		'use strict';

  		// configure angular templating denotation to play nice with Twig
  		$interpolateProvider.startSymbol('{[').endSymbol(']}');

  	});
    */


  angular.module('cla')
  	.controller('AppController', ['$scope', '$meteor', '$http', function($scope, $meteor, $http) {


    	window.__ad__ = window.__ad__ || {};
    	var Ad = window.__ad__
    	;

      /*
       * Initialize lifecycle of the controller
       */
  		$scope.initialize = function() {



  		};


      /*
       * Update lifecycle of the controller
       */
  		$scope.update = function() {

  		};

      $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };


      angular.element(document).ready(function () {
        $scope.initialize();



      });



  }]); // end controller


  /*
   * Works controller for browsing works index
   *
   */
   /*
  angular.module('app')
  	.controller('WorksController', ['$scope', '$meteor', 'Api', function($scope, $meteor, Api) {

    	window.__ad__ = window.__ad__ || {};
    	var Ad = window.__ad__
    	;

      /*
       * Initialize lifecycle of the controller
       */
       /*
  		$scope.initialize = function() {

        //Api.get_authors( "latin", "perseus", $scope._update_authors );
        Api.get( {}, $scope._update );

  		};


      /*
       * Update lifecycle of the controller
       */
       /*
  		$scope.update = function() {

  		};

      /*
       * Update callback for Api.get
       */
       /*
  		$scope._update = function( data ) {
        $scope.text = data;

  		};

      /*
       * Update callback for Api.get_authors
       */
       /*
  		$scope._update_authors = function( data ) {

        $scope.authors = data.authors;


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
       /*
angular.module('app')

	.factory( 'Api', function ( $http ) {
		'use strict';

		var Api = {

			get : function( query, callback ){

				// check get_posts_lock to limit number of queries sent via instant search
				// get commentary data
				console.log( "GET params:", query);
				$http({
						method : 'JSONP',
						url : 'http://localhost:5000/query',
						params : {
              callback : "JSON_CALLBACK",
              query : query

            }

        }).then( function( resp ) {
						console.log("API Response:", resp);

						if ( typeof callback !== "undefined" ) {
							callback( resp.data );
						}

					}, function( err ) {

						console.log("API Error", err );

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
					}).then( function( resp ) {
						console.log("API Response:", resp);

						if ( typeof callback !== "undefined" ) {
							callback( resp.data );
						}

					}, function( err ) {

						console.log("API Error", err );

					});

			}


		}

		return Api;

	});

*/

  angular.module('cla')
  .filter('debug', function() {
    return function(input) {
      if (input === '') return 'empty string';
      return input ? input : ('' + input);
    };
  });


})(jQuery)

}// Meteor.isClient
