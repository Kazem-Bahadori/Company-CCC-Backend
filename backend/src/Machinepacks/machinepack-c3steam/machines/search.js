import cache from 'memory-cache';
import fetch from "node-fetch";


module.exports = {


  friendlyName: 'search',


  description: 'Searches for steam appid from the name of the game',


  cacheable: true,


  sync: false,


  inputs: {
    assetType: {
      example: 'gameId',
      description: 'The type of asset that you want to get',
      require: true
    },
    queryString: {
      example: 'Dota 2',
      description: 'The name of the game you want to search for',
      require: true
    },
  },


  exits: {

    success: {
      example: {
        "appId": 354160
      },
      description: 'The appId of the game you searched for',
    },
    error: {
      example: {
        description: 'bad request - assetType input error',
        code: 400
      },
      description: 'There was some kind of error',
      code: 'The status code'
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
              if (game['name'].toLowerCase() === name.toLowerCase() && game['appid']!='0') {
                //Why does it return zerro when game not found?
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