const fetch = require('node-fetch')
module.exports = {

  friendlyName: 'content',
  description: 'The function should return a list of json objects representing assets provided by the implemented content provider.',
  cacheable: false,
  sync: false,
  inputs: {
    filterType: {
      example: 'top, contexual',
      description: 'specifies what you want within the selected category. Can also be contextual if the call is complex',
      require: true
    },
    assetType: {
      example: 'games',
      description: 'Specifies which assetType that you want to get',
      require: false
    },
    filterValue: {
      example: 'related to',
      description: 'if one value is searched for',
      require: false
    },
    context: {
      example: '20',
      description: 'The body. Context to specify what is wanted',
      require: false
    },
    offset: {
      example: '0',
      description: 'Number of element to skip at beginning of result',
      require: false
    },
    limit: {
      example: '20',
      description: 'Number of elements to include in the result',
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

    if (inputs.assetType == 'games') {
      if (inputs.filterType == 'top') {
        url = url.concat('games/top')
        if (inputs.limit != undefined) {
          url = url.concat('?first=' + inputs.limit)
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
      } else if (inputs.filterType == 'contextual') {
        if (isEmpty(inputs)) { //Checks if body is empty
          return exits.error('bad request - No context given')
        }

        if (inputs.hasOwnProperty('filter_by')) {

          if (inputs.filter_by == 'top_games') {
            url = url.concat('games/top?')
            let checkFirst = false; //A check to see if a parameter has been added so subsequent parameters adds '&'

            if (inputs.hasOwnProperty('quantity') && inputs.quantity >= 1 && inputs.quantity <= 100) {
              url = url.concat('first=' + inputs.quantity) //twitch only supports 1-100 items each call
              checkFirst = true
            }
            if (inputs.hasOwnProperty('page_after')) {
              //adds pagination. Makes it so you can make a call to get a continous list of data where a previous one ended
              if (checkFirst == true) { //checks if there is something before it incase it needs to add '&'
                url = url.concat('&after=' + inputs.page_after)
              } else {
                url = url.concat('after=' + inputs.page_after)
              }
            }

            fetchFromTwitch(url) //gets the top streamed games on twitch.
              .then(response => {
                return exits.success(response);  // returns the Json to the client
              })
          } else {
            return exits.error('bad request - incorrect filter')
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
    } else if (inputs.assetType == 'streams') {
      if (inputs.filterType == 'game') {
        if (inputs.filterValue != undefined) {
          url = url.concat('streams?game_id=' + inputs.filterValue)
          fetchFromTwitch(url) // Gets the tops streams on a specific game
            .then(response => {

              if (Object.keys(response.data).length == 0) { //Checks if the response is empty
                return exits.error('no streams found - check spelling of game_id')
              }
              return exits.success(response);  // returns the Json to the client
            })
          } else {
            return exits.error('bad request - no game_id is given')
          }
      //~~~~~~~~~~~~~~~~~~~~~~~~ stream contextual ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      } else if (inputs.filterType == 'contextual') {

        if (isEmpty(inputs)) { //Checks if body is empty
          return exits.error('bad request - No context given')
        }

        if (inputs.filter_by == 'game_id') {
          if (inputs.hasOwnProperty('game_id')) { //Checks if game_id exists within body
            url = url.concat('streams?game_id=' + inputs.game_id)
          } else {
            return exits.error('bad request - no game_id found')
          }
          if (inputs.hasOwnProperty('quantity') && inputs.quantity >= 1 && inputs.quantity <= 100) {
            url = url.concat('&first=' + inputs.quantity)
          } else {
            return exits.error('bad request - quantity must be between 1-100')
          }
          if (inputs.hasOwnProperty('page_after')) {
            //adds pagination. Makes it so you can make a call to get a continous list of data where a previous one ended
            url = url.concat('&after=' + inputs.page_after)
          }

          fetchFromTwitch(url) // Gets the tops streams on a specific game
            .then(response => {

              if (Object.keys(response.data).length == 0) { //Checks if the response is empty
                return exits.error('no streams found - check spelling of game_id')
              }
              return exits.success(response);  // returns the Json to the client
            })
        } else {
          return exits.error('bad request - incorrect filter')
        }
      } else {
        return exits.error('bad request - filterType input error')
      }

    //------------------------------------- Streamer info ---------------------------------------------------------------

    } else if (inputs.assetType == 'streamerInfo'){
      if (inputs.filterType == "streamerId") {
        if (inputs.filterValue != undefined) {
          url = url.concat('users?id=' + inputs.filterValue)
          console.log(url)
          fetchFromTwitch(url)
              .then(response => {
                return exits.success(response);  // returns the Json to the client
              })
        } else {
          return exits.error('bad request - incorrect user id or filterType not empty')
        }
      }
    }else {
      return exits.error('bad request - assetType input error')
    }

    //------------------------------------- Seperate functions ---------------------------------------------------------------

    //Does the call towards the twitch api
    function fetchFromTwitch(url) {
      let keys = require('./keys.json');
      return new Promise((resolve, reject) => {
    /*  console.log(keys[0].Client);*/
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
