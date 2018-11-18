import cache from 'memory-cache';
import fetch from "node-fetch";


module.exports = {


  friendlyName: 'search',


  description: 'Searches for app_id from game_name',


  cacheable: false,


  sync: false,


  inputs: {

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },
    error: {
      description: 'There was some kind of error',
      code: 200
    }

  },


  fn: function (inputs, exits
    /*``*/
  ) {
    if (inputs.query.assetType == "gameId") {
      const name = inputs.query.queryString;
      if (name != undefined) { //Checks that queryString isn't left empty

        getSteamGames()
          .then(games => {
            for (let game of games) {
              if (game['name'] == name) {
                return exits.success({ appId: game['appid'] });
              }
            }
            return exits.success(false);
          })
          .catch(err => {
            return exits.error({
              description: err,
              code: 500
            });
          })

      } else {
        return exits.error({
          description: 'bad request - queryString input error',
          code: 400
        });
      }
    } else {
      return exits.error({
        description: 'bad request - assetType input error',
        code: 400
      });
    }

    function getSteamGames() {
      const timeToStoreData = 600000; // Milliseconds 600000 = 10 minutes
      return new Promise(function (resolve, reject) {
        const steamGames = cache.get('steamGames');
        if (!steamGames) { // If data is not in the cache
          console.log('Does not exist, fetching data...');
          fetch('http://api.steampowered.com/ISteamApps/GetAppList/v0002/')
            .then(response => response.json())
            .then(data => data['applist']['apps'])
            .then(data => {
              cache.put('steamGames', data, timeToStoreData);
              resolve(data);
            })
            .catch(err => reject(err));
        } else {
          resolve(steamGames);  
        }
      });
    }
  },


};