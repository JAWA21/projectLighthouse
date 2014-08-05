'use strict';

// Lighthouses controller
angular.module('lighthouses').controller('LighthousesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Lighthouses',
	function($scope, $stateParams, $location, Authentication, Lighthouses ) {
		$scope.authentication = Authentication;

		// Create new Lighthouse
		$scope.create = function() {
			// Create new Lighthouse object
			var lighthouse = new Lighthouses ({
				name: this.name
			});

			// Redirect after save
			lighthouse.$save(function(response) {
				$location.path('lighthouses/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Lighthouse
		$scope.remove = function( lighthouse ) {
			if ( lighthouse ) { lighthouse.$remove();

				for (var i in $scope.lighthouses ) {
					if ($scope.lighthouses [i] === lighthouse ) {
						$scope.lighthouses.splice(i, 1);
					}
				}
			} else {
				$scope.lighthouse.$remove(function() {
					$location.path('lighthouses');
				});
			}
		};

		// Update existing Lighthouse
		$scope.update = function() {
			var lighthouse = $scope.lighthouse ;

			lighthouse.$update(function() {
				$location.path('lighthouses/' + lighthouse._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Lighthouses
		$scope.find = function() {
			$scope.lighthouses = Lighthouses.query();
		};

		// Find existing Lighthouse
		$scope.findOne = function() {
			$scope.lighthouse = Lighthouses.get({ 
				lighthouseId: $stateParams.lighthouseId
			});
		};
	}
]);