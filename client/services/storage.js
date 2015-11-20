/*global angular */

/**
 *
 * Storage.js
 *
 * If API is unavialable, set and access data in localStorage to be resolved later.
 * -- modified from example code at TodoMVC Angular application
 *
 */
angular.module('cla')
	.factory('appStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {
				return $injector.get('api');
			}, function () {
				return $injector.get('localStorage');
			});
	})

	.factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'cla';

		var store = {
			comments: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (comments) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(comments));
			},

			clearCompleted: function () {
				var deferred = $q.defer();

				var completeComments = [];
				var incompleteComments = [];
				store.comments.forEach(function (comment) {
					if (comment.completed) {
						completeComments.push(comment);
					} else {
						incompleteComments.push(comment);
					}
				});

				angular.copy(incompleteComments, store.comments);

				store._saveToLocalStorage(store.comments);
				deferred.resolve(store.comments);

				return deferred.promise;
			},

			delete: function (comment) {
				var deferred = $q.defer();

				store.comments.splice(store.comments.indexOf(comment), 1);

				store._saveToLocalStorage(store.comments);
				deferred.resolve(store.comments);

				return deferred.promise;
			},

			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.comments);
				deferred.resolve(store.comments);

				return deferred.promise;
			},

			insert: function (comment) {
				var deferred = $q.defer();

				store.comments.push(comment);

				store._saveToLocalStorage(store.comments);
				deferred.resolve(store.comments);

				return deferred.promise;
			},

			put: function (comment, index) {
				var deferred = $q.defer();

				store.comments[index] = comment;

				store._saveToLocalStorage(store.comments);
				deferred.resolve(store.comments);

				return deferred.promise;
			}
		};

		return store;
	});
