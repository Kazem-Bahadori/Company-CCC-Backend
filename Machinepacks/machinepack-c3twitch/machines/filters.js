module.exports = {


  friendlyName: 'filters',


  description: 'fetches and filters content from steam',


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
    console.log('Twitch function triggered!')
    return exits.success();
  },



};