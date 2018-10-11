import {
	version
} from '../../package.json';
import {
	Router
} from 'express';
const fetch = require('node-fetch');
const Twitch = require('../Machinepacks/machinepack-c3twitch');
//Steam node-machine from npm
const Steam = require('machinepack-steam');
export default ({
	config,
	db
}) => {
	let api = Router();
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version
		});
	});
	api.get('/twitch/health', (req, res) => {
		Twitch.health().exec({

			// An unexpected error occurred.
			error: function (err) {

				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {

				result
					.then(() => {
						res.sendStatus(200);
					})
					.catch(err => res.sendStatus(err));
			},
		});
	});
	api.get('/twitch/filters', (req, res) => {
		const inputs = {
			query: req.query,
			body: req.body,
		}
		Twitch.filters(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {

				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {

				result.then(function (response) {
					res.send(response);
				});
			},
		});
	});

	api.get('/twitch/search', (req, res) => {
		const inputs = {
			query: req.query,
			body: req.body,
		}
		Twitch.filters(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {

				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {

				result.then(function (response) {
					res.send(response);
				});
			},
		});
	});

	api.get('/steam/filters', (req, res) => {
		// Returns on global statistics of a specific game
		Steam.getGlobalStatsForGame({
			appid: 400,
			name: ['global.map.emp_isle'],
		}).exec({
			// An unexpected error occurred.
			error: function (err) {
				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {
				res.json({
					result
				});
			},
		});
	});
	api.get('/aggregate/filters', (req, res) => {
		res.json({
			'aggregate': 'success!'
		});
	});
	return api;
}