import Steam from '../../machinepack-c3steam';
import Twitch from '../../machinepack-c3twitch';
module.exports = {


  friendlyName: 'content',

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

    switch (inputs.assetType) {
      case 'games':
        switch (inputs.filterType) {
          case 'top':
            const amount = inputs.limit !== undefined ? inputs.limit : 20; //if no input, default to 20
            getTopGames(amount)
              .then(games => {
                return exits.success([games]);
              })
              .catch(err => {
                return exits.error({
                  description: 'Something happened',
                  code: 500
                });
              });
            break;

          case 'category':
            if (inputs.filterValue === 'steamGame') {
              getTopGames(100)
                .then(games => {
                  let steamGames = games.data.filter(game => game.steam !== false);
                  if (Object.keys(steamGames).length > 20) {
                    steamGames = steamGames.slice(0, 20);
                  }
                  games.data = steamGames
                  return exits.success([games]);
                })
                .catch(err => {
                  return exits.error({
                    description: err,
                    code: 500
                  });
                });
            } else {
              return exits.error({
                description: 'bad request - filterValue input error',
                code: 400
              });
            }
            break;
          default:
            return exits.error({
              description: 'bad request - filterType input error',
              code: 400
            });
        }
        break;
      default:
        return exits.error({
          description: 'bad request - assetType input error',
          code: 400
        });
    }

    /**
     * Get the currently top streamed games from twitch and and adds steaminfo for the games that are also on steam
     *
     * @param amount an integer representing the number of games to request from twitch
     * @returns a list containing the top streamed games with steam price information added if the game is available on steam
     */
    function getTopGames(amount) {
      if (amount >= 1 && amount <= 100) { // each twitch-call only accepts numbers between 1-100.
        const inputs = {
          query: {
            assetType: 'games',
            filterType: 'top',
            filterValue: amount
          }
        };
        return new Promise((resolve, reject) => {
          Twitch.filters(inputs).exec({
            // An unexpected error occurred.
            error: function (err) {
              reject(err);
            },
            // OK.
            success: function (result) {
              gamesIsOnSale(result)
                .then(res => resolve(res))
                .catch(err => reject(err));
            },
          });
        })
      } else {
        return exits.error({
          description: 'bad request - filtervalue for top games must be between 1-100',
          code: 400
        });
      }
    }

    /**
     * Takes a list of name of games and tries to find a match on steam. Adds an appid or false to each name.
     *
     * @param nameOfGames a list of names of games used to search for matches on steam
     * @returns a list of matched names and appids
     */
    function getSteamID(nameOfGames) {
      const steamInputs = {
        assetType: 'games',
        filterType: 'onTwitch',
        filterValue: 'nameOfGames'
      };
      const promises = [];
      nameOfGames.data.forEach(function (element) {
        promises.push(new Promise(function (resolve, reject) {
          steamInputs.filterValue = element.name;
          Steam.content(steamInputs).exec({
            // An unexpected error occurred.
            error: function (err) {
              reject(err);
            },
            // OK.
            success: function (result) {
              resolve(result[0]);
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
      return new Promise((resolve, reject) => {
        const games = twitchGames;
        let IDs = []; // list to save appid's in
        let names = { data: [] }; // list to save the game names in
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
                resolve(games);
              })
          })
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
          assetType: 'details',
          filterType: 'appId',
          data: appId
      };
      return new Promise((resolve, reject) => {

        Steam.content(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            reject(err);
          },
          // OK.
          success: function (result) {
            resolve(result[0]);
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
