const fetch = require('node-fetch');
module.exports = {

  friendlyName: 'filters',
  description: 'fetches and filters content from twitch',
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
      description: 'specifies what you want within the selected category',
      require: true
    },
    filterValue: {
      example: '10',
      description: 'id\'s or numbers, gameID, userID, amount of streams etc.',
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
        if (inputs.query.filterValue != undefined) {
          if (inputs.query.filterValue >= 1 && inputs.query.filterValue <= 100) { // each twitch-call only accepts numbers between 1-100.
            url = url.concat('games/top?first=' + inputs.query.filterValue)
            fetchFromTwitch(url) //gets the top streamed games on twitch. 
              .then(response => {
                return exits.success(response);  // returns the Json to the client 
              })
          } else {
            return exits.error('bad request - filtervalue for top games must be between 1-100')
          }

        } else {
          url = url.concat('games/top')
          fetchFromTwitch(url) //gets the top streamed games on twitch. 20 is default in the twitch api
            .then(response => {
              return exits.success(response);  // returns the Json to the client 
            })
        }
      } else {
        return exits.error('bad request - filterType input error');
      }

    } else if (inputs.query.assetType == 'streams') {
      if (inputs.query.filterType == 'game_id') {
        if (inputs.query.filterValue != null) {
          url = url.concat('streams?game_id=' + inputs.query.filterValue)
          fetchFromTwitch(url) // Gets the tops streams on a specific game
            .then(response => {

              if (Object.keys(response.data).length == 0){ //Checks if the response is empty
                return exits.error('no streams found - check spelling of game_id')
              }

              //here starts hte process to get streamers displayname from twitch and put it into the list of streams
              twitchResponse = response // saves the response to a variable
              multiCallVar = twitchResponse.data[0].user_id //adds the streamers id to multiCallVar

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
        } else {
          return exits.error('bad request - filterValue input error');
        }
      } else {
        return exits.error('bad request - filterType input error');
      }
    } else {
      return exits.error('bad request - assetType input error');
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
