const fetch = require('node-fetch');

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
    //fetch('https://api.twitch.tv/kraken/games/top?client_id=3jxj3x3uo4h6xcxh2o120cu5wehsab')
    fetch('https://api.twitch.tv/helix/games/top', {headers: {"Client-ID": '3jxj3x3uo4h6xcxh2o120cu5wehsab'}}) 
 
       		.then(res => res.json())
       		.then(json => res.send(json));
    const response = inputs;
    return exits.success(response);
  },



};
