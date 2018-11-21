const fetch = require('node-fetch')
import Steam from '../../machinepack-c3steam';

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


  fn: function (inputs, exits
    /*``*/
  ) {
    let url = 'https://api.twitch.tv/kraken/search/'

    if (inputs.query.assetType == "games") { // if you are searching for games on twitch
      if (inputs.query.queryString != undefined) { //Checks that queryString isn't left empty
        url = url.concat('games?query=' + inputs.query.queryString ) //adds the searchword to the url
        searchOnTwitch(url) //calls the searchOnTwitch function
          .then(response => { //takes the response from the searchOnTwitch function

            response.games.forEach(function (element) { //Changes the output recived from twitch
              element.id = element._id;
              delete element._id;
              element.box_art_url = element.box.large;
              delete element.box;
              delete element.logo;
              delete element.localized_name;
              delete element.locale;
              delete element.giantbomb_id;
              //element.steam = getSteamID(element.name); //Get data from steam
            });

            /*
            var results = response['games'];  //Posibility to sort the output data
            results.sort(function(a,b){
              if(a.popularity == b.popularity)
                  return 0;
              if(a.popularity < b.popularity)
                  return 1;
              if(a.popularity > b.popularity)
                  return -1;
          });
          response['games'] = results;
          */

            //});

            return exits.success(response);  // returns the response to the client
          })
      }
    } else if (inputs.query.assetType == "streams") {
      let limit =20; //Sets the limit of streams shown.
      if (inputs.query.queryString != undefined) { //Checks that queryString isn't left empty
        url = url.concat('streams/?query=' + inputs.query.queryString +'&limit=' + limit) //adds the searchword to the url
        console.log(url);
          console.log('ajaj');
        searchOnTwitch(url) //calls the searchOnTwitch function
          .then(response => { //takes the response from the searchOnTwitch function

            /*   response.streams.forEach(function(element) { //Changes name from _id to id
                 element.id = element._id;
                 delete element._id;

               }); */

            return exits.success(response);  // returns the response to the client
          })
      } else {
        return exits.error('bad request - no queryString  given')
      }
    } else {
      return exits.error('bad request - incorrect assetType')
    }

    function searchOnTwitch(url) { //Sends the url with the id
     let keys = require('./keys.json');
    /*  console.log(keys[0].Accept);
      console.log(keys[0].Client);*/
      return new Promise(function (resolve, reject) {
        fetch(url, {
          headers: {
            'Accept': keys[0].Accept,
            'Client-ID': keys[0].Client
          }
        })
          .then(function (response) {
            resolve(response.json())
          })
      });
    }
    /*
    function getSteamID(nameOfGame) {
      const inputs = {
        query: {
          assetType: 'games',
          filterType: 'on_twitch',
          filterValue: nameOfGame
        }
      }
      return new Promise((resolve, reject) => {
        Steam.filters(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            reject(err);
          },
          // OK.
          success: function (result) {
            resolve(result);
          },
        });
      });
    }
     */
  }
}
