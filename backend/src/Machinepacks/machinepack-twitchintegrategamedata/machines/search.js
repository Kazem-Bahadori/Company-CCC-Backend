module.exports = {


  friendlyName: 'search',


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
    return exits.success();
  },



};
