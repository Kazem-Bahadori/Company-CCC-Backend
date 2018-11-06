const fetch = require('node-fetch');
import Steam from '../../machinepack-c3steam';

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
    let url = 'https://api.twitch.tv/helix/'; // the main url of the twitch api

    let twitchResponse = {} // a variable used to store json when multiple calls are done
    let multiCallVar // a variable used when having to do send in multiple values in a call to twitch

    if (inputs.query.assetType == 'games') {
      if (inputs.query.filterType == 'top') {
        const amount = inputs.query.filterValue != undefined ? inputs.query.filterValue : 20;
        getTopGames(amount)
          .then(games => {
            return exits.success(games);
          })
          .catch(err => {
            return exits.error(err);
          });
      } else if (inputs.query.filterType === 'category') {
        if (inputs.query.filterValue === 'steamGame') {

          getTopGames(100)
            .then(games => {
              let steamGames = games.filter(game => game.steam != false);
              if(Object.keys(steamGames).length > 20) {
                steamGames = steamGames.slice(0,20);
              }
              return exits.success(steamGames);
            })
            .catch(err => {
              return exits.error(err);
            });
        } else {
          return exits.error('bad request - filterType input error');
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

              if (Object.keys(response.data).length == 0) { //Checks if the response is empty
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

    function getTopGames(amount) {
      return new Promise((resolve, reject) => {
        if (amount >= 1 && amount <= 100) { // each twitch-call only accepts numbers between 1-100.
          url = url.concat('games/top?first=' + amount)
          fetchFromTwitch(url) //gets the top streamed games on twitch. 
            .then(response => {
              gamesIsOnSale(response.data)
                .then(res => resolve(res))
                .catch(err => reject(err));
            });
        } else {
          return exits.error('bad request - filtervalue for top games must be between 1-100')
        }
      });
    }

    function fetchFromTwitch(url) {
      return new Promise((resolve, reject) => {
        fetch(url, { headers: { 'Client-ID': '3jxj3x3uo4h6xcxh2o120cu5wehsab' } })
          .then(function (response) {
            resolve(response.json());
          })
      });
    }

    function getSteamID(nameOfGame) {
      const inputs = {
        query: {
          assetType: 'games',
          filterType: 'on_twitch',
          filterValue: nameOfGame
        }
      }
      return new Promise((resolve, reject) => {
        Steam.filters(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            reject(err);
          },
          // OK.
          success: function (result) {
            resolve(result);
          },
        });
      });
    }

    function gamesIsOnSale(twitchGames) {
      const promises = [];
      const games = twitchGames;
      games.forEach(function (element) {
        promises.push(new Promise(function (resolve, reject) {
          getSteamID(element.name)
            .then(game => {
              if (game.appId != undefined) {
                getSteamData(game.appId)
                  .then(data => {
                    resolve(data)
                  })
                  .catch(() => resolve(false));
              } else {
                resolve(game);
              }
            });
        })
        );
      });

      return new Promise((resolve, reject) => {
        Promise.all(promises).then(values => {
          for (let i = 0; i < games.length; i++) {
            games[i]['steam'] = values[i];
          }
          resolve(games);
        })
      });
    }

    function getSteamData(appId) {
      const inputs = {
        query: {
          assetType: 'price',
          filterType: 'app_id',
          filterValue: appId
        }
      }
      return new Promise((resolve, reject) => {
        Steam.filters(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            reject(err);
          },
          // OK.
          success: function (result) {
            resolve({ 'appid': appId, price: result });
          },
        });
      });
    }
  },
};