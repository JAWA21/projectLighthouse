'use strict';

//Setting up route
angular.module('lighthouses').config(['$stateProvider',
	function($stateProvider) {
		// Lighthouses state routing
		$stateProvider.
		state('listLighthouses', {
			url: '/lighthouses',
			templateUrl: 'modules/lighthouses/views/list-lighthouses.client.view.html'
		}).
		state('createLighthouse', {
			url: '/lighthouses/create',
			templateUrl: 'modules/lighthouses/views/create-lighthouse.client.view.html'
		}).
		state('viewLighthouse', {
			url: '/lighthouses/:lighthouseId',
			templateUrl: 'modules/lighthouses/views/view-lighthouse.client.view.html'
		}).
		state('editLighthouse', {
			url: '/lighthouses/:lighthouseId/edit',
			templateUrl: 'modules/lighthouses/views/edit-lighthouse.client.view.html'
		});
	}
]);