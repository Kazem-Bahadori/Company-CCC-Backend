import Twitch from '../../machinepack-c3twitch';
import Steam from '../../machinepack-c3steam';

module.exports = {


  friendlyName: 'health',


  description: '',


  cacheable: false,


  sync: false,


  inputs: {

  },


  exits: {

    success: {
      result: 200,
      description: 'Server alive.',
    },
    exit: {
      result: 500,
      description: 'Server not alive.',
    },

  },


  fn: function(inputs, exits
    /*``*/
  ) {
    Twitch.health().exec({
			// An unexpected error occurred.
			error: function () {
        return exits.error();
			},
			// OK.
			success: function () {
				Steam.health().exec({
          // An unexpected error occurred.
          error: function () {
            return exits.error();
          },
          // OK.
          success: function () {
            return exits.success();
          },
        });
			},
		});
  },



};
