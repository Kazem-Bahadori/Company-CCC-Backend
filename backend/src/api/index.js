import { version } from '../../package.json';
import { Router } from 'express';
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
	api.get('/twitch/filters', (req, res) => {
		Twitch.filters(req.body).exec({
			
			// An unexpected error occurred.
			error: function (err) {
				
				console.log(err);
				res.sendStatus(500);
			},
			// OK.
			success: function (result) {
				fetch('https://api.twitch.tv/helix/games/top', {headers: {"Client-ID": '3jxj3x3uo4h6xcxh2o120cu5wehsab'}}) 
				.then(res => res.json())
				.then(json => res.send(json));
					
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