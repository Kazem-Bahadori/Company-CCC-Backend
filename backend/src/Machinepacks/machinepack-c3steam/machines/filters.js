const fetch = require('node-fetch');
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
    //console.log('Steam function triggered!')

    let url = 'http://store.steampowered.com/api/'; // the main url of the twitch api

    //console.log(inputs.query)

    if (inputs.query.assetType == 'price') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //gets the top streamed games on twitch. 
            .then(response => {

              let appId = inputs.query.filterValue;
              let steamResponse = {}

              steamResponse = response[appId]
              let price = steamResponse.data.price_overview

              //return exits.success(response.price_overview);  // returns the Json to the client 
              return exits.success(price);  // returns the Json to the client 
            })
          } else {
            return exits.error('bad request - filterValue input error');
          }
        } else {
          return exits.error('bad request - filterType input error');
        }
    } else if (inputs.query.assetType == 'system_requirements') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('appdetails?appids=' + inputs.query.filterValue)
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

              //return exits.success(response.pc_requirements, response.mac_requirements, respnse.linux_requirements);  // returns the Json to the client 
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
          fetchFromSteam(url) //gets the top streamed games on twitch. 
            .then(response => {

              let appId = inputs.query.filterValue;
              let steamResponse = {}

              steamResponse = response[appId]
              let review = steamResponse.data.reviews

              //return exits.success(response.reviews);  // returns the Json to the client 
              return exits.success(review);  // returns the Json to the client 
            })
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