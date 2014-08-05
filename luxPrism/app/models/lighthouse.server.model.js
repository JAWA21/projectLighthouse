'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Lighthouse Schema
 */
var LighthouseSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Lighthouse name',
		trim: true
	},
	dateBuilt: {
		type: Date,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Lighthouse', LighthouseSchema);