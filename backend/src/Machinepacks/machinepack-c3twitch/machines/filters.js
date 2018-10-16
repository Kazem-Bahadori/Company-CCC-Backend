const fetch = require('node-fetch');
module.exports = {

  friendlyName: 'filters',
  description: 'fetches and filters content from steam',
  cacheable: false,
  sync: false,
  inputs: {
      filterType: {
        example: 'games',
        description: 'what you want to get',
        require: true
      },
      assetType: {
        example: 'top',
        description: 'amount of what you want to get',
        require: false
      },
      additionalFilter: {
        example: 'first',
        description: 'additional filter for calls',
        require: false
      },
      amount: {
        example: '20',
        description: 'amount of items to call',
        require: false
      },
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

    var url = "https://api.twitch.tv/helix/" + inputs.query.filterType;

    if (inputs.query.assetType != null){
      url = url.concat("/" + inputs.query.assetType);
    }
    if (inputs.query.additionalFilter != null){
      url = url.concat("?" + inputs.query.additionalFilter);
    }
    if (inputs.query.amount != null){
      url = url.concat("=" + inputs.query.amount);
    }

    console.log(url)

         fetch(url, {headers: {"Client-ID": '3jxj3x3uo4h6xcxh2o120cu5wehsab'}})
         .then(function(response){
             return exits.success(response.json());
         })
  },
};
