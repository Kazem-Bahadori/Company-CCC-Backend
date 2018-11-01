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
    console.log('Steam function triggered!')

    let url = 'http://store.steampowered.com/api/'; // the main url of the twitch api

    let twitchResponse = {} // a variable used to store json when multiple calls are done
    let multiCallVar // a variable used when having to do send in multiple values in a call to twitch

    console.log(inputs.query)



    if (inputs.query.assetType == 'price') {
      if (inputs.query.filterType == 'appid') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //gets the top streamed games on twitch. 
            .then(response => {

              //return exits.success(response.price_overview);  // returns the Json to the client 
              return exits.success(response);  // returns the Json to the client 
            })
        }
      }
    }

    if (inputs.query.assetType == 'system_requirements') {
      if (inputs.query.filterType == 'appid') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //gets the top streamed games on twitch. 
            .then(response => {

              //return exits.success(response.pc_requirements, response.mac_requirements, respnse.linux_requirements);  // returns the Json to the client 
              return exits.success(response);  // returns the Json to the client 
            })
        }
      }
    }

    if (inputs.query.assetType == 'reviews') {
      if (inputs.query.filterType == 'appid') {
        if (inputs.query.filterValue != undefined) {
          url = url.concat('appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //gets the top streamed games on twitch. 
            .then(response => {

              //return exits.success(response.reviews);  // returns the Json to the client 
              return exits.success(response);  // returns the Json to the client 
            })
        }
      }
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