const fetch = require('node-fetch');
const fs = require('fs');

module.exports = {

  friendlyName: 'filters',
  description: 'fetches and filters content from steam',
  cacheable: false,
  sync: false,
  inputs: {
    assetType: {
      example: 'games',
      description: 'Category what you want to get',
      require: false
    },
    filterType: {
      example: 'contexual',
      description: 'specifies what you want within the selected category',
      require: true
    },
    filterValue: {
      example: '10',
      description: 'id\'s or numbers, gameID, userID, amount of streams etc.',
      require: false
    },
    context: {
      example: '20',
      description: 'amount of items to call',
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
    let url = 'http://store.steampowered.com/api/'; // the main url of the twitch api

    if (inputs.query.assetType == 'price') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url)
            .then(response => {
              const appId = inputs.query.filterValue;
              const steamResponse = response[appId];
              if (steamResponse.data != undefined) {
                let price = steamResponse.data.price_overview
                return exits.success(price);  // returns the Json to the client
              } else {
                return exits.error('Could not find price data');
              }

              get_gameprice
            })
            .catch (err => exits.error(err));
        } else {
          return exits.error('bad request - filterValue input error');
        }
      } else {
        return exits.error('bad request - filterType input error');
      }
    } else if (inputs.query.assetType == 'system_requirements') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //gets the top streamed games on twitch.
            .then(response => {

              let appId = inputs.query.filterValue;
              let steamResponse = {}

              steamResponse = response[appId]
              let requirements = {
                pc_requirements: steamResponse.data.pc_requirements,
                mac_requirements: steamResponse.data.mac_requirements,
                linux_requirements: steamResponse.data.linux_requirements
              }

              return exits.success(requirements);  // returns the Json to the client
            })
        } else {
          return exits.error('bad request - filterValue input error');
        }
      } else {
        return exits.error('bad request - filterType input error');
      }
    } else if (inputs.query.assetType == 'reviews') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('appdetails?appids=' + inputs.query.filterValue)

          fetchFromSteam(url)
          get_gameprice
            .then(response => {

              let review = response.query_summary

              return exits.success(review);  // returns the Json to the client
            })
        } else {
          return exits.error('bad request - filterValue input error');
        }
      } else {
        return exits.error('bad request - filterType input error');
      }
    } else if (inputs.query.assetType == 'games') {
      if (inputs.query.filterType == 'on_twitch') {
        if (inputs.query.filterValue != undefined) {

          let games = require('./steam_games.json');
          let name = inputs.query.filterValue
          let gameObject
          let counter = 0;


          while (counter < games.length) {

            gameObject = games[counter]

            if (gameObject.name == name) {
              return exits.success({ appId: gameObject['appid'] });  // returns the Json to the client
            }
            counter++
          }
          return exits.success(false)  // returns the Json to the client

        } else {
          return exits.error('bad request - filterValue input error');
        }
      } else {
        return exits.error('bad request - filterType input error');
      }
    } else {
      return exits.error('bad request - assetType input error');
    }

    function fetchFromSteam(url) {
      return new Promise(function (resolve, reject) {
        fetch(url)
          .then(function (response) {
            resolve(response.json());
          })
      });
    }
  }
};
