import { version } from '../../package.json';
import { Router } from 'express';
const fetch = require('node-fetch');
const Twitch = require('../Machinepacks/machinepack-c3twitch');
//Steam node-machine from npm
const Steam = require('../Machinepacks/machinepack-c3steam');
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

				//result.then(function (response) {
					//res.send(response); 
					//});
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