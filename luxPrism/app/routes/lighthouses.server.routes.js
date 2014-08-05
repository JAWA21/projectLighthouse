'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var lighthouses = require('../../app/controllers/lighthouses');

	// Lighthouses Routes
	app.route('/lighthouses')
		.get(lighthouses.list)
		.post(users.requiresLogin, lighthouses.create);

	app.route('/lighthouses/:lighthouseId')
		.get(lighthouses.read)
		.put(users.requiresLogin, lighthouses.hasAuthorization, lighthouses.update)
		.delete(users.requiresLogin, lighthouses.hasAuthorization, lighthouses.delete);

	// Finish by binding the Lighthouse middleware
	app.param('lighthouseId', lighthouses.lighthouseByID);
};