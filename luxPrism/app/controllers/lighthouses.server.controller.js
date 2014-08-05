'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Lighthouse = mongoose.model('Lighthouse'),
	_ = require('lodash');

/**
 * Create a Lighthouse
 */
exports.create = function(req, res) {
	var lighthouse = new Lighthouse(req.body);
	lighthouse.user = req.user;

	lighthouse.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(lighthouse);
		}
	});
};

/**
 * Show the current Lighthouse
 */
exports.read = function(req, res) {
	res.jsonp(req.lighthouse);
};

/**
 * Update a Lighthouse
 */
exports.update = function(req, res) {
	var lighthouse = req.lighthouse ;

	lighthouse = _.extend(lighthouse , req.body);

	lighthouse.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(lighthouse);
		}
	});
};

/**
 * Delete an Lighthouse
 */
exports.delete = function(req, res) {
	var lighthouse = req.lighthouse ;

	lighthouse.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(lighthouse);
		}
	});
};

/**
 * List of Lighthouses
 */
exports.list = function(req, res) { Lighthouse.find().sort('-created').populate('user', 'displayName').exec(function(err, lighthouses) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(lighthouses);
		}
	});
};

/**
 * Lighthouse middleware
 */
exports.lighthouseByID = function(req, res, next, id) { Lighthouse.findById(id).populate('user', 'displayName').exec(function(err, lighthouse) {
		if (err) return next(err);
		if (! lighthouse) return next(new Error('Failed to load Lighthouse ' + id));
		req.lighthouse = lighthouse ;
		next();
	});
};

/**
 * Lighthouse authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.lighthouse.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};