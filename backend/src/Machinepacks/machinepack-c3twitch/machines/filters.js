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


  fn: function (inputs, exits
    /*``*/
  ) {
    console.log('Twitch function triggered!')
    //TODO look at the parameters from the input to know which data to fetch
    //TODO fetch data from twitch
    //TODO filter the data that you want
    const response = inputs;
    return exits.success(response);
  },



};
