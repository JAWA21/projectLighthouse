'use strict';

//Lighthouses service used to communicate Lighthouses REST endpoints
angular.module('lighthouses').factory('Lighthouses', ['$resource',
	function($resource) {
		return $resource('lighthouses/:lighthouseId', { lighthouseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);