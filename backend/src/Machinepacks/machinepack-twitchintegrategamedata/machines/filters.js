import Twitch from '../../machinepack-c3twitch';

module.exports = {


  friendlyName: 'filters',


  description: '',


  cacheable: false,


  sync: false,


  inputs: {

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits
    /*``*/
  ) {
    console.log('triggered! Should combine tiwtch with steam!');
    // Twitch.filters(inputs).exec({

		// 	// An unexpected error occurred.
		// 	error: function (err) {

		// 		console.log('ERROR:', err);
		// 		return exits.error(err);
		// 	},
		// 	// OK.
		// 	success: function (result) {

		// 		return exits.success(result);
		// 	},
    // });
    return exits.success('result');
  },



};