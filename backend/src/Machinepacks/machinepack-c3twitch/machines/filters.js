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
  },
  fn: function (inputs, exits
    /*``*/
  ) {

    let url = 'https://api.twitch.tv/helix/' // the main url of the twitch api

    console.log(inputs.query)

    //------------------------------------- Top games ---------------------------------------------------------------

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
          return exits.error('bad request - No context given')
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
            return exits.error('bad request - incorrect filter')
          }
        }
      }

      //------------------------------------- Top streams ---------------------------------------------------------------

    } else if (inputs.query.assetType == 'streams') {
      if (inputs.query.filterType == 'game') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('streams?game_id=' + inputs.query.filterValue)
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
      } else if (inputs.query.filterType == 'contextual') {

        if (isEmpty(inputs.body)) { //Checks if body is empty
          return exits.error('bad request - No context given')
        }

        if (inputs.body.filter_by == 'game_id') {
          if (inputs.body.hasOwnProperty('game_id')) { //Checks if game_id exists within body
            url = url.concat('streams?game_id=' + inputs.body.game_id)
          } else {
            return exits.error('bad request - no game_id found')
          }
          if (inputs.body.hasOwnProperty('quantity') && inputs.body.quantity >= 1 && inputs.body.quantity <= 100) {
            url = url.concat('&first=' + inputs.body.quantity)
          } else {
            return exits.error('bad request - quantity must be between 1-100')
          }
          if (inputs.body.hasOwnProperty('page_after')) {
            //adds pagination. Makes it so you can make a call to get a continous list of data where a previous one ended
            url = url.concat('&after=' + inputs.body.page_after)
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

    } else if (inputs.query.assetType == 'streamer_info'){
      if (inputs.query.filterType == undefined && inputs.query.filterValue != undefined) {
        url = url.concat('users?id=' + inputs.query.filterValue)
        console.log(url)
        fetchFromTwitch(url)
            .then(response => {
              return exits.success(response);  // returns the Json to the client
            })
      } else {
        return exits.error('bad request - incorrect user id or filterType not empty')
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
