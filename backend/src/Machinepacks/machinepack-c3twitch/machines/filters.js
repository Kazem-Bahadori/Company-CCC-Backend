const fetch = require('node-fetch');
module.exports = {
  
  friendlyName: 'filters',
  description: 'fetches and filters content from steam',
  cacheable: false,
  sync: false,
  inputs: {
    assetType: {
      example: 'top',
      description: 'amount of what you want to get',
      require: false
      },
      filterType: {
        example: 'games',
        description: 'what you want to get',
        require: true
      },
      filterValue: {
        example: 'first',
        description: 'additional filter for calls',
        require: false
      },
      context: {
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

    let url = 'https://api.twitch.tv/helix/';
    const amount = 10;
    
    console.log(inputs.query)

    if (inputs.query.assetType == 'games'){
      if (inputs.query.filterType == 'top'){
        url = url.concat('games/top')
      } 
    } else if (inputs.query.assetType == 'streams'){
      if (inputs.query.filterType == 'game_id'){
        if(inputs.query.filterValue != null) {
          url = url.concat('streams?game_id=' + inputs.query.filterValue)
          fetchFromTwitch(url)
            .then(response => {
              // let streams = []
              // for (stream of response) {
              //   streams.add(stream.game_id);
              // }
               return response;
            })
            .then(x => console.log(x));
        }
        
      }
    }



    
    // if (inputs.query.assetType != null){
    //   url = url.concat('/' + inputs.query.assetType);
    // }
    // if (inputs.query.additionalFilter != null){
    //   url = url.concat('?' + inputs.query.additionalFilter);
    // }
    // if (inputs.query.amount != null){
    //   url = url.concat('=' + inputs.query.amount);
    // }

    function fetchFromTwitch(url) {
      return new Promise(function(resolve, reject){
        fetch(url, {headers: {'Client-ID': '3jxj3x3uo4h6xcxh2o120cu5wehsab'}})
        .then(function(response){
            resolve(response.json());
        })
      });
    }

    fetch(url, {headers: {'Client-ID': '3jxj3x3uo4h6xcxh2o120cu5wehsab'}})
        .then(response => {
            return exits.success(response.json());
        })

  },
};