const fetch = require('node-fetch')
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
      example: 'top, contexual',
      description: 'specifies what you want within the selected category. Can also be contextual if the call is complex',
      require: true
    },
    filterValue: {
      example: 'related to, action',
      description: 'if one value is searched for',
      require: false
    },
    context: {
      example: '20',
      description: 'The body. Context to specify what is wanted',
      require: false
    },
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


    let url = 'https://api.twitch.tv/helix/' // URL of the Twitch api

    /**
    * Return top games through the assetType `games` string and filterType `top`
    *
    * Base: /api/twitch/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: games)
    *   - `filterType` specify how games should be sorted - input value: string (allowed: top)
    *   - `filterValue` return specified amount of games - input value: integer (allowed: 1-100)
    *
    * Example URL: ?assetType=games&filterType=top&filterValue=5
    * Description: Return games (assetType) filtered by Twitch's top games (filterType), limit
    * (filterValue) return to 5 games
    */

    if (inputs.query.assetType == 'games') {
      if (inputs.query.filterType == 'top') {
        url = url.concat('games/top')
        if (inputs.query.filterValue != undefined) {
          url = url.concat('?first=' + inputs.query.filterValue)
          fetchFromTwitch(url) //gets the top streamed games on twitch.
            .then(response => {
              return exits.success(response);  // returns the Json to the client
            })
        } else {
          fetchFromTwitch(url) //gets the top streamed games on twitch.
              .then(response => {
                return exits.success(response);  // returns the Json to the client
              })
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~ game contextual ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      } else if (inputs.query.filterType == 'contextual') {
        if (isEmpty(inputs.body)) { //Checks if body is empty
          return exits.error({
            description: 'bad request - No context given',
            code: 400});
        }

        if (inputs.body.hasOwnProperty('filter_by')) {

          if (inputs.body.filter_by == 'top_games') {
            url = url.concat('games/top?')
            let checkFirst = false; //A check to see if a parameter has been added so subsequent parameters adds '&'

            if (inputs.body.hasOwnProperty('quantity') && inputs.body.quantity >= 1 && inputs.body.quantity <= 100) {
              url = url.concat('first=' + inputs.body.quantity) //twitch only supports 1-100 items each call
              checkFirst = true
            }
            if (inputs.body.hasOwnProperty('page_after')) {
              //adds pagination. Makes it so you can make a call to get a continous list of data where a previous one ended
              if (checkFirst == true) { //checks if there is something before it incase it needs to add '&'
                url = url.concat('&after=' + inputs.body.page_after)
              } else {
                url = url.concat('after=' + inputs.body.page_after)
              }
            }

            fetchFromTwitch(url) //gets the top streamed games on twitch.
              .then(response => {
                return exits.success(response);  // returns the Json to the client
              })
          } else {
            return exits.error({
              description: 'bad request - incorrect filter',
              code: 400});
          }
        }
      }
    /**
    * Return top games through the assetType `games` string and filterType `top`
    *
    * Base: /api/twitch/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: streams)
    *   - `filterType` specify how games should be sorted - input value: string (allowed: game)
    *   - `filterValue` return specified game id - input value: integer (allowed: any)
    *
    * Example URL: ?assetType=streams&filterType=game&filterValue=21779
    * Description: Return streams (assetType) filtered by Twitch's one specified game (filterType),
    * limit (filterValue) return to a Twitch game ID
    */
    } else if (inputs.query.assetType == 'streams') {
      if (inputs.query.filterType == 'game') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('streams?game_id=' + inputs.query.filterValue)
          fetchFromTwitch(url) // Gets the tops streams on a specific game
            .then(response => {

              if (Object.keys(response.data).length == 0) { //Checks if the response is empty
                return exits.error({
                  description: 'no streams found - check spelling of game_id',
                  code: 400});

              }
              return exits.success(response);  // returns the Json to the client
            })
          } else {
            return exits.error({
              description: 'bad request - no game_id is given',
              code: 400});
          }
      //~~~~~~~~~~~~~~~~~~~~~~~~ stream contextual ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      } else if (inputs.query.filterType == 'contextual') {

        if (isEmpty(inputs.body)) { //Checks if body is empty
          return exits.error({
            description: 'bad request - No context given',
            code: 400});
        }

        if (inputs.body.filter_by == 'game_id') {
          if (inputs.body.hasOwnProperty('game_id')) { //Checks if game_id exists within body
            url = url.concat('streams?game_id=' + inputs.body.game_id)
          } else {
            return exits.error({
              description: 'bad request - no game_id found',
              code: 400});
          }
          if (inputs.body.hasOwnProperty('quantity') && inputs.body.quantity >= 1 && inputs.body.quantity <= 100) {
            url = url.concat('&first=' + inputs.body.quantity)
          } else {
            return exits.error({
              description: 'bad request - quantity must be between 1-100',
              code: 400});
          }
          if (inputs.body.hasOwnProperty('page_after')) {
            //adds pagination. Makes it so you can make a call to get a continous list of data where a previous one ended
            url = url.concat('&after=' + inputs.body.page_after)
          }

          fetchFromTwitch(url) // Gets the tops streams on a specific game
            .then(response => {

              if (Object.keys(response.data).length == 0) { //Checks if the response is empty
                return exits.error({
                  description: 'no streams found - check spelling of game_id',
                  code: 400});
              }
              return exits.success(response);  // returns the Json to the client
            })
        } else {
          return exits.error({
            description: 'bad request - incorrect filter',
            code: 400});
        }
      } else {
        return exits.error({
          description: 'bad request - filterType input error',
          code: 400});
      }

    //------------------------------------- Streamer info ---------------------------------------------------------------

    } else if (inputs.query.assetType == 'streamer_info'){
      if (inputs.query.filterType == undefined && inputs.query.filterValue != undefined) {
        url = url.concat('users?id=' + inputs.query.filterValue)

        fetchFromTwitch(url)
            .then(response => {
              return exits.success(response);  // returns the Json to the client
            })
      } else {
        return exits.error({
          description: 'bad request - incorrect user id or filterType not empty',
          code: 400});
      }

    } else {
      return exits.error({
        description: 'bad request - assetType input error',
        code: 400});
    }

    //------------------------------------- Seperate functions ---------------------------------------------------------------

    //Does the call towards the twitch api
    function fetchFromTwitch(url) {
      let keys = require('./keys.json');
      return new Promise((resolve, reject) => {
    /*  (keys[0].Client);*/
        fetch(url, { headers: { 'Client-ID': keys[0].Client } })
          .then(function (response) {
            resolve(response.json())
          })
      });
    }

    //Used to check if Json is empty
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }
  },
};
