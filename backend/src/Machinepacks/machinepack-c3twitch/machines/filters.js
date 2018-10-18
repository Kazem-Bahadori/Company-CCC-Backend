const fetch = require('node-fetch');
module.exports = {

  friendlyName: 'filters',
  description: 'fetches and filters content from steam',
  cacheable: false,
  sync: false,
  inputs: {
    assetType: {
      example: 'games',
      description: 'Category what you want to get',
      require: false
    },
    filterType: {
      example: 'contexual',
      description: ' ',
      require: true
    },
    filterValue: {
      example: 'first',
      description: 'gameID, userID etc.',
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

    let url = 'https://api.twitch.tv/helix/'; // the main url of the twitch api

    let twitchResponse = {} // a variable used to store json when multiple calls are done
    let multiCallVar // a variable used when having to do send in multiple values in a call to twitch

    console.log(inputs.query)

    if (inputs.query.assetType == 'games') {
      if (inputs.query.filterType == 'top') {
        url = url.concat('games/top')
        fetchFromTwitch(url) //gets the 20 top streamed games on twitch
          .then(response => {
            return exits.success(response);  // returns the Json to the client 
          })
      } else {
        return exits.error('filterType input error');
      }

    } else if (inputs.query.assetType == 'streams') {
      if (inputs.query.filterType == 'game_id') {
        if (inputs.query.filterValue != null) {
          url = url.concat('streams?game_id=' + inputs.query.filterValue)
          fetchFromTwitch(url) // Gets the tops streams on a specific game
            .then(response => {
              twitchResponse = response
              multiCallVar = twitchResponse.data[0].user_id

              for (var user in twitchResponse['data']) { // Gets all the user id's from the top streams and adds them to multiCallVar
                //adds each user_id with the proper urlsyntax to multiCallVar
                multiCallVar = multiCallVar.concat('&id=' + twitchResponse.data[user].user_id)
              }

              fetchFromTwitch('https://api.twitch.tv/helix/users?id=' + multiCallVar) // makes a twitch api call to get user info on all the multiCallVar
                .then(response => {

                  for (var key in twitchResponse.data) { // for each stream entry for the game we called earlier
                    twitchResponse.data[key].display_name = response.data[key].display_name //adds display_name of the streamer to the stream
                  }
                  return exits.success(twitchResponse); // returns the Json to the client 
                })
            })
        }
      } else {
        return exits.error('filterType input error');
      }
    } else {
      return exits.error('assetType input error');
    }

    function fetchFromTwitch(url) {
      return new Promise(function (resolve, reject) {
        fetch(url, { headers: { 'Client-ID': '3jxj3x3uo4h6xcxh2o120cu5wehsab' } })
          .then(function (response) {
            resolve(response.json());
          })
      });
    }
  },
};