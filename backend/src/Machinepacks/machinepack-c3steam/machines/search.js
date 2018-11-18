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
      if (inputs.query.queryString != undefined) { //Checks that queryString isn't left empty
        let games = require('./steam_games.json');
        let name = inputs.query.queryString;

        for (let game of games) {
          if (game['name'] == name) {
            return exits.success({ appId: game['appid'] });
          }
        }
        return exits.success(false);

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
  },



};