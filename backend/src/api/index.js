import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

var twitch = require('../../../Machinepacks/machinepack-c3twitch');
export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/twitch/filters', (req, res) => {
		// twitch.filters()
		res.json({
			'twitch': 'success!'
		});
	});

	api.get('/steam/filters', (req, res) => {
		res.json({
			'steam': 'success!'
		});
	});

	api.get('/aggregate/filters', (req, res) => {
		res.json({
			'aggregate': 'success!'
		});
	});

	return api;
}
