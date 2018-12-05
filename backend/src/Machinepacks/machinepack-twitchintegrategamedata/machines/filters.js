import Steam from '../../machinepack-c3steam';
import Twitch from '../../machinepack-c3twitch';
module.exports = {


  friendlyName: 'filters',

  description: 'fetches and filters content from twitch and integrates it with information on steam if available',

  cacheable: false,

  sync: false,

  inputs: {
    assetType: {
      example: 'games',
      description: 'Category what you want to get',
      require: false
    },
    filterType: {
      example: 'top, contexual',
      description: 'specifies what you want within the selected category. Can also be contextual if the call is complex',
      require: true
    },
    filterValue: {
      example: 'related to, action, 100',
      description: 'if one value is searched for',
      require: false
    }
  },

  exits: {
    success: {
      variableName: 'result',
      description: 'Done.',
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

    /**
    * Return top games through the assetType `games` string and filterType `top` and adds additional information from steam
    *
    * Base: /api/twitch/filters
    * Options:
    * 
    *   - `assetType` specify type of output - input value: string (allowed: games)
    *   - `filterType` specify how games should be sorted - input value: string (allowed: top, category)
    *   - `filterValue` return specified amount of games - input value: integer (allowed: 1-100, steamgame). defaults to 20 if no input given
    * 
    * Example URL: ?assetType=games&filterType=top&filterValue=5
    * Description: Return games (assetType) filtered by Twitch's top games (filterType), limit
    * (filterValue) return to 5 games
    */

    switch (inputs.query.assetType) {
      case 'games':
        switch (inputs.query.filterType) {
          case 'top':
            const amount = inputs.query.filterValue !== undefined ? inputs.query.filterValue : 20; //if no input, default to 20
            getTopGames(amount, false)
              .then(games => {
                return exits.success(games);
              })
              .catch(err => {
                return exits.error(err);
              });
            break;

          case 'category':
            if (inputs.query.filterValue === 'steamGame') {
              getTopGames(100, false)
                .then(games => {
                  let steamGames = games.filter(game => game.steam !== false);
                  if (Object.keys(steamGames).length > 20) {
                    steamGames = steamGames.slice(0, 20);
                  }
                  return exits.success(steamGames);
                })
                .catch(err => {
                  return exits.error(err);
                });
            } else {
              return exits.error('bad request - filterValue input error')
            }
            break;
          case 'contextual':
            if (isEmpty(inputs.body)) {
              return exits.error('bad request - No context given')
            }
            switch (inputs.body.filter_by) { // Checks the content of body 
              case 'top_games':
                getTopGames(20, inputs.body)
                  .then(games => {
                    return exits.success(games);
                  })
                  .catch(err => {
                    return exits.error(err);
                  });
                break;

              case 'steamgame':
                getTopGames(100, inputs.body)
                  .then(games => {
                    let steamGames = games.filter(game => game.steam != false);
                    if (Object.keys(steamGames).length > 20) {
                      steamGames = steamGames.slice(0, 20);
                    }
                    return exits.success(steamGames);
                  })
                  .catch(err => {
                    return exits.error(err);
                  });
                break;
              default:
                return exits.error('bad request - body filter_by input error')
            }
            break;

          default:
            return exits.error('bad request - filterType input error');
        }
        break;
      default:
        return exits.error({
          description: 'bad request - assetType input error',
          code: 400});
    }

    /**
     * Get the currently top streamed games from twitch and and adds steaminfo for the games that are also on steam
     * 
     * @param amount an integer representing the number of games to request from twitch
     * @param context either a body to use for calling twitch machine or false if no body is provided.
     * @returns a list containing the top streamed games with steam price information added if the game is available on steam
     */
    function getTopGames(amount, context) {
      return new Promise((resolve, reject) => {
        let twitchInputs // the inputs to send to twitch machine
        if (context != false) {
          twitchInputs = {
            query: {
              assetType: 'games',
              filterType: 'contextual',
            },
            body: context
          }
        } else if (amount >= 1 && amount <= 100) { // each twitch-call only accepts numbers between 1-100.
          twitchInputs = {
            query: {
              assetType: 'games',
              filterType: 'top',
              filterValue: amount
            }
          } 
        } else {
          return exits.error({
            description: 'bad request - filtervalue for top games must be between 1-100',
            code: 400});
        }
        return new Promise((resolve, reject) => {
          Twitch.filters(twitchInputs).exec({
            // An unexpected error occurred.
            error: function (err) {
              reject(err);
            },
            // OK.
            success: function (result) {

              resolve(result)
              //return exits.success(result);

            },
          });
        })
          .then(response => {
            gamesIsOnSale(response)
              .then(res => resolve(res))
              .catch(err => reject(err));
          });
      })
    }

    /**
     * Takes a list of name of games and tries to find a match on steam. Adds an appid or false to each name.
     * 
     * @param nameOfGames a list of names of games used to search for matches on steam
     * @returns a list of matched names and appids
     */
    function getSteamID(nameOfGames) {
      const inputs = {
        query: {
          assetType: 'games',
          filterType: 'on_twitch',
          filterValue: nameOfGames
        }
      };
      const promises = [];
      nameOfGames.data.forEach(function (element) {
        promises.push(new Promise(function (resolve, reject) {
          inputs.query.filterValue = element.name;
          Steam.filters(inputs).exec({
            // An unexpected error occurred.
            error: function (err) {
              reject(err);
            },
            // OK.
            success: function (result) {
              resolve(result);
            }
          });
        })
        );
      });

      return new Promise((resolve, reject) => {
        Promise.all(promises).then(values => {
          for (let i = 0; i < nameOfGames.data.length; i++) {
            nameOfGames.data[i].steam = { 'appid': values[i].appId };
          }
          resolve(nameOfGames);
        });
      });
    }

    /** 
     * Takes a list of of games on twitch and checks if they are on sale on steam and adds that to the json
     * 
     * @param twitchGames a json-list with twitchgames
     * @returns the list of games with with price and steam appid added
    */
    function gamesIsOnSale(twitchGames) {
      const games = twitchGames;
      let IDs = []; // list to save appid's in
      let names = { data: [] }; // list to save the game names in

      return new Promise((resolve, reject) => {
        games.data.forEach(function (element) {
          names.data.push({ 'name': element.name });
        });
        getSteamID(names) // calls function to check if the names matches games on steam
          .then(response => {
            for (let i = 0; i < games.data.length; i++) {
              if (response.data[i].steam.appid !== undefined) {
                games.data[i].steam = response.data[i].steam;
                IDs.push(response.data[i].steam.appid); // adds the appids to a list to use later
              } else {
                games.data[i].steam = false;
              }
            }
          })
          .then(function () {
            getSteamData(IDs) //calls function to request the information on all the appids
              .then(response => {
                let count = 0; // variable used to itterate over the response-list
                for (var key in games.data) {
                  if (games.data[key].steam !== false) { // if it's false game doesn't exist on steam so it skips it
                    if (count > response.length) { // if count is bigger than the response-list the there are no more games to add so it breaks the loop
                      break;
                    } else {
                      if (response[IDs[count]].success === false) { // if appid exists but game is not actually on steam set entry to false
                        games.data[key].steam = false;
                        count++;
                      } else if (isEmpty(response[IDs[count]].data) && response[IDs[count]].success !== false) { // if game is free set price to '0'
                        games.data[key].steam.price = {
                          'final': 0,
                          'discount_percent': 0
                        };
                        count++;
                      } else { // if data exists add it to the response
                        games.data[key].steam.price = response[IDs[count]].data;
                        count++;
                      }
                    }
                  }
                }
                return exits.success(games);
              });
          });
      });
    }

    /**
     * Takes a list off steam appids and returns the price overview information for each appid
     * 
     * @param appId a list of steam appids to request the price overview information on
     * @returns the list of appids with price information
     */
    function getSteamData(appId) {
      const inputs = {
        query: {
          assetType: 'getDetails',
          filterType: 'app_id'
        },
        body: {
          data: appId
        }
      };
      return new Promise((resolve, reject) => {

        Steam.filters(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            reject(err);
          },
          // OK.
          success: function (result) {
            resolve(result);
          }
        });
      });
    }

    /**
     * Checks if an object is empty (not having any elements)
     * 
     * @param obj the object to be checked
     * @returns true/false
     */
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }
  },
};
