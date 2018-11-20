import { version } from '../../package.json';
import { Router } from 'express';
import Twitch from '../Machinepacks/machinepack-c3twitch';
import Steam from '../Machinepacks/machinepack-c3steam';
import TwitchIntegratedData from '../Machinepacks/machinepack-twitchintegrategamedata';

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
			error: function () {
				res.sendStatus(500);
			},
			// OK.
			success: function () {
				res.sendStatus(200);
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

				res.send(result);
			},
		});
	});
	// twitch/search is the url
	api.get('/twitch/search', (req, res) => {
		// req.query = ?filterType=games&assetType=top
		
		const inputs = {
			query: req.query,
			body: req.body,
		}
		
		Twitch.search(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {

				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {

				res.send(result);
			},
		});
	});

	api.get('/steam/filters', (req, res) => {
		const inputs = {
			query: req.query,
			body: req.body,
		}
		Steam.filters(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {

				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {

				res.send(result);
			},
		});
	});

	api.get('/steam/search', (req, res) => {
		const inputs = {
			query: req.query
		}
		Steam.search(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {

				console.log(err.description);
				res.sendStatus(err.code);
			},
			// OK.
			success: function (result) {
				console.log(result);
				res.send(result);
			},
		});
	});

	api.get('/aggregation/filters', (req, res) => {
		const inputs = {
			query: req.query,
			body: req.body,
		}
		TwitchIntegratedData.filters(inputs).exec({
			// An unexpected error occurred.
			error: err => {
				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {
				res.send(result);
			},
		});
	});

	api.get('/aggregation/search', (req, res) => {
		// req.query = ?filterType=games&assetType=top
		const inputs = {
			query: req.query,
			body: req.body,
		}
		TwitchIntegratedData.search(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {

				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {

				res.send(result);
			},
		});
	});

	return api;
}