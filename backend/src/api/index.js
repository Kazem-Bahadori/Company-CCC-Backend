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
	api.get('/steam/health', (req, res) => {
		Steam.health().exec({

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
	api.get('/twitchandsteam/health', (req, res) => {
		TwitchIntegratedData.health().exec({

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

	//A special query key value can be added to the request to enable the content provider to only provide faked values (or at least not using the real backend). Support the usage of fake=true in the querystring.
	api.post('/twitch/content', (req, res) => {
		let inputs;
		if (req.query.assetType !== undefined && req.query.filterType !== undefined) {
			inputs = {
				filterType: req.query.filterType,
				assetType: req.query.assetType,
				filterValue: req.query.filterValue,
				offset: 0,
				limit: req.query.limit
			}
		} else {
			inputs = req.body;
		}
		Twitch.content(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {

				res.send(result);
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
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {
				res.send(result);
			},
		});
	});

	//A special query key value can be added to the request to enable the content provider to only provide faked values (or at least not using the real backend). Support the usage of fake=true in the querystring.
	api.post('/steam/content', (req, res) => {
		let inputs;
		if (req.query.assetType !== undefined && req.query.filterType !== undefined) {
			inputs = {
				filterType: req.query.filterType,
				assetType: req.query.assetType,
				filterValue: req.query.filterValue,
				offset: 0,
				limit: req.query.limit
			}
		} else {
			inputs = req.body;
		}
		Steam.content(inputs).exec({

			// An unexpected error occurred	.
			error: function (err) {
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
			body:  req.body,
		}
		Steam.filters(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {
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
				res.sendStatus(err.code);
			},
			// OK.
			success: function (result) {

				res.send(result);
			},
		});
	});
	//A special query key value can be added to the request to enable the content provider to only provide faked values (or at least not using the real backend). Support the usage of fake=true in the querystring.
	api.post('/twitchandsteam/content', (req, res) => {
		let inputs;
		if (req.query.assetType !== undefined && req.query.filterType !== undefined) {
			inputs = {
				filterType: req.query.filterType,
				assetType: req.query.assetType,
				filterValue: req.query.filterValue,
				offset: 0,
				limit: req.query.limit
			}
		} else {
			inputs = req.body;
		}
		// Example
		// {
		// 	"filterType": "top",
		// 	"assetType": "games",
		// 	"offset": 0,
		// 	"limit": 15
		// }
		TwitchIntegratedData.content(inputs).exec({
			// An unexpected error occurred.
			error: err => {
				res.sendStatus(err.code);
			},
			// OK.
			success: function (result) {
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
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {
				res.send(result);
			},
		});
	});

	api.get('/twitchandsteam/search', (req, res) => {
		// req.query = ?filterType=games&assetType=top
		const inputs = {
			query: req.query,
			body: req.body,
		}
		TwitchIntegratedData.search(inputs).exec({

			// An unexpected error occurred.
			error: function (err) {
				res.sendStatus(err.code);
			},
			// OK.
			success: function (result) {

				res.send(result);
			},
		});
	});

	return api;
}
