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

         fetch('https://api.twitch.tv/helix/games/top', {headers: {"Client-ID": '3jxj3x3uo4h6xcxh2o120cu5wehsab'}})
         .then(function(response){
             return exits.success(response.json());
         })
  },
};