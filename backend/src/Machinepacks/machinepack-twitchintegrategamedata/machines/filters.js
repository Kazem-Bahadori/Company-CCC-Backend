import Steam from '../../machinepack-c3steam';
module.exports = {


  friendlyName: 'filters',


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
      }
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



    }

  },



};