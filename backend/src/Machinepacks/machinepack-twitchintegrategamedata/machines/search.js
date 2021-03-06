import Steam from '../../machinepack-c3steam';
import Twitch from '../../machinepack-c3twitch';

module.exports = {

  friendlyName: 'search',
  description: 'Searches for content from twitch',
  cacheable: false,
  sync: false,
  inputs: {
    assetType: {
      example: 'games',
      description: 'Category what you want to get',
      require: false
    },
    filterType: {
      example: '',
      description: 'specifies what you want within the selected category. Can also be contextual if the call is complex',
      require: true
    },
    queryString: {
      example: 'starcraft',
      description: 'What you want to search for',
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
    if (inputs.query.assetType == "games") { // if you are searching for games on twitch
      if (inputs.query.queryString != undefined) {
        Twitch.search(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            return exits.error({
              description: 'Something went wrong - "games"',
              code: 500
            });
          },
          // OK.
          success: function (twitchData) {
            const someInput = {
              query: {
                assetType: 'gameId',
                queryString: 'Abatron'
              }
            }
            // The first search is only used to Trigger download
            Steam.search(someInput).exec({ // This is used to trigger the download of the steamgames json
              error: err => {
                console.log(err);
                return exits.error({
                  description: 'Something went wrong - "steam"',
                  code: 500
                });
              },
              success: () => { // Runs when list of games is cached
                let promises = [];
                if (twitchData.games === null) {
                  return exits.success(null);
                } 
                twitchData.games.forEach(game => {
                  const inputs = {
                    query: {
                      assetType: 'gameId',
                      queryString: game.name
                    }
                  }
                  promises.push(new Promise((resolve, reject) => { // Adds promises for searching for Steamgames to a list
                    Steam.search(inputs).exec({
                      error: err => {
                        reject(err);
                      },
                      success: result => {
                        let aggregated = game;
                        aggregated.steam = result;
                        resolve(aggregated);
                      }
                    })
                  }));
                });
                Promise.all(promises)
                  .then(values => { //When all games are searched for, then send response with the data
                    return exits.success(values);
                  })
                  .catch(err => {
                    return exits.error({
                      description: 'Something went wrong',
                      code: 500
                    });
                  });
              }
            })
          }
        });
      } else {
        return exits.error({
          description: 'bad request - queryString input error',
          code: 400
        });
      }
    } else if (inputs.query.assetType == "streams") {
      Twitch.search(inputs).exec({
        // An unexpected error occurred.
        error: err => {
          return exits.error({
            description: 'Something went wrong',
            code: 500
          });
        },
        // OK.
        success: twitchData => {
          return exits.success(twitchData);
        }
      });
    } else {
      return exits.error({
        description: 'bad request - assetType input error',
        code: 400
      });
    }
  }
}
