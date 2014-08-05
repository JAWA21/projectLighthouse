'use strict';

(function() {
	// Lighthouses Controller Spec
	describe('Lighthouses Controller Tests', function() {
		// Initialize global variables
		var LighthousesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Lighthouses controller.
			LighthousesController = $controller('LighthousesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Lighthouse object fetched from XHR', inject(function(Lighthouses) {
			// Create sample Lighthouse using the Lighthouses service
			var sampleLighthouse = new Lighthouses({
				name: 'New Lighthouse'
			});

			// Create a sample Lighthouses array that includes the new Lighthouse
			var sampleLighthouses = [sampleLighthouse];

			// Set GET response
			$httpBackend.expectGET('lighthouses').respond(sampleLighthouses);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.lighthouses).toEqualData(sampleLighthouses);
		}));

		it('$scope.findOne() should create an array with one Lighthouse object fetched from XHR using a lighthouseId URL parameter', inject(function(Lighthouses) {
			// Define a sample Lighthouse object
			var sampleLighthouse = new Lighthouses({
				name: 'New Lighthouse'
			});

			// Set the URL parameter
			$stateParams.lighthouseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/lighthouses\/([0-9a-fA-F]{24})$/).respond(sampleLighthouse);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.lighthouse).toEqualData(sampleLighthouse);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Lighthouses) {
			// Create a sample Lighthouse object
			var sampleLighthousePostData = new Lighthouses({
				name: 'New Lighthouse'
			});

			// Create a sample Lighthouse response
			var sampleLighthouseResponse = new Lighthouses({
				_id: '525cf20451979dea2c000001',
				name: 'New Lighthouse'
			});

			// Fixture mock form input values
			scope.name = 'New Lighthouse';

			// Set POST response
			$httpBackend.expectPOST('lighthouses', sampleLighthousePostData).respond(sampleLighthouseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Lighthouse was created
			expect($location.path()).toBe('/lighthouses/' + sampleLighthouseResponse._id);
		}));

		it('$scope.update() should update a valid Lighthouse', inject(function(Lighthouses) {
			// Define a sample Lighthouse put data
			var sampleLighthousePutData = new Lighthouses({
				_id: '525cf20451979dea2c000001',
				name: 'New Lighthouse'
			});

			// Mock Lighthouse in scope
			scope.lighthouse = sampleLighthousePutData;

			// Set PUT response
			$httpBackend.expectPUT(/lighthouses\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/lighthouses/' + sampleLighthousePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid lighthouseId and remove the Lighthouse from the scope', inject(function(Lighthouses) {
			// Create new Lighthouse object
			var sampleLighthouse = new Lighthouses({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Lighthouses array and include the Lighthouse
			scope.lighthouses = [sampleLighthouse];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/lighthouses\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLighthouse);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.lighthouses.length).toBe(0);
		}));
	});
}());