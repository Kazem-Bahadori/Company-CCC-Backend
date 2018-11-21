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
  },

  fn: function(inputs, exits
    /*``*/
    
  ) {
    if (inputs.query.assetType == "games") { // if you are searching for games on twitch
      if (inputs.query.queryString != undefined) {


        return new Promise((resolve, reject) => {
          Twitch.search(inputs).exec({
            // An unexpected error occurred.
            error: function (err) {
              reject(err);
            },
            // OK.
            success: function (result) {

              resolve(result)
              //console.log(result);
              //return exits.success(result);

            },
          });
        }) 
        .then (response => {

          response.games.forEach(element => {
            let steamInputs = {
              query: {
                assetType: 'gameId',
                queryString: element.name
              }
            }
            new Promise((resolve, reject) => {
              Steam.search(steamInputs).exec({
                // An unexpected error occurred.
                error: function (err) {
                  reject(err);
                  console.log(err);
                },
                // OK.
                success: function (result) {
                  //resolve({ 'appid': appId, price: result });
                  //console.log(result);
                  if (result.appId != 0) {
                    element.steamId = result.appId;
                  }
          
            
          });
        })


          //console.log("Test Oscar 2");
          //console.log(inputs);
         
          /* let result = new Promise((resolve, reject) => {
            Twitch.search(inputs).exec({
              // An unexpected error occurred.
              error: function (err) {
                reject(err);
              },
              // OK.
              success: function (result) {
  
                //resolve(result)
                
                result.games.forEach(element => {
                  let steamInputs = {
                    query: {
                      assetType: 'gameId',
                      queryString: element.name
                    }
                  }
                  //console.log(element);
                   new Promise((resolve, reject) => {
                    Steam.search(steamInputs).exec({
                      // An unexpected error occurred.
                      error: function (err) {
                        reject(err);
                        console.log(err);
                      },
                      // OK.
                      success: function (result) {
                        //resolve({ 'appid': appId, price: result });
                        //console.log(result);
                        if (result.appId != 0) {
                          element.steamId = result.appId;
                        }
                        console.log(element);
                      },
                    });
                  }); 
                });             
              },
            })
            //resolve(result)
          }) */
          //console.log("result: " + result);        
          
          //return exits.success(result);
        //return exits.success();
      }
    }
  }

};