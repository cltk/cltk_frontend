/*global angular */

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

				var Ad = window.__ad__ = window.__ad__ || {}
				;



				// check get_posts_lock to limit number of queries sent via instant search
				// get commentary data
				console.log( "GET params:", query);
				$http({
						method : 'GET',
						url : 'http://path.to.flask.app/api',
						params : {

						}
					})
					.success( function( resp ) {
						console.log("API Response:", resp);

						if ( typeof callback !== "undefined" ) {
							callback( resp );
						}

					}).error( function( err ) {

						console.log("API Error", err);

					});

			}


		}

		return Api;

	});
