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
    //console.log('Steam function triggered!')

    let url = 'http://store.steampowered.com/'; // the main url of the twitch api

    if (inputs.query.assetType == 'game_info') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url)
            .then(response => {
              const appId = inputs.query.filterValue;
              const steamResponse = response[appId];

              if (steamResponse.data != undefined) {
                let price = {};
                if (steamResponse.data.is_free) {
                  price.final = 0;
                  price.discount_percent = 0;
                } else {
                  price = steamResponse.data.price_overview
                }

                let all_info = {}

                all_info['price'] = price;
                all_info['pc_requirements'] = steamResponse.data.pc_requirements;
                all_info['mac_requirements'] = steamResponse.data.mac_requirement;
                all_info['linux_requirements'] = steamResponse.data.linux_requirements;
                all_info['trailer'] = steamResponse.data.movies[0].webm.max;
                all_info['description'] = steamResponse.data.short_description;
                all_info['developer'] = steamResponse.data.developers;
                all_info['publisher'] = steamResponse.data.publishers;
                all_info['genres'] = steamResponse.data.genres;

                fetchFromSteam('http://store.steampowered.com/appreviews/' + appId + '?json=1')
            .then(review_response => {


              if (review_response.query_summary != undefined) {
                all_info['reviews'] = review_response.query_summary
                return exits.success(all_info);


            } else {
              return exits.error('Could not find review data');
            }

          })
          .catch (err => exits.error(err));
                } else {
                return exits.error('Could not find any data');
              }

            })
            .catch (err => exits.error(err));

          } else {
            return exits.error('bad request - filterValue input error');
          }
        } else {
          return exits.error('bad request - filterType input error');
        }

      } else if (inputs.query.assetType == 'price') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url)
            .then(response => {
              const appId = inputs.query.filterValue;
              const steamResponse = response[appId];
              if (steamResponse.data != undefined) {
                let price = {};
                if (steamResponse.data.is_free) {
                  price.final = 0;
                  price.discount_percent = 0;
                } else {
                  price = steamResponse.data.price_overview
                }
                return exits.success(price);
              } else {
                console.log(response[appId]);
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
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url)
            .then(response => {

              const appId = inputs.query.filterValue;
              const steamResponse = response[appId]


              if (steamResponse.data != undefined) {

              let requirements = {
                pc_requirements: steamResponse.data.pc_requirements,
                mac_requirements: steamResponse.data.mac_requirements,
                linux_requirements: steamResponse.data.linux_requirements
              }

              return exits.success(requirements);  // returns the Json to the client
            } else {
              console.log(response[appId]);
              return exits.error('Could not find requirement data');
            }

          })
          .catch (err => exits.error(err));
        } else {
          return exits.error('bad request - filterValue input error');
        }
      } else {
        return exits.error('bad request - filterType input error');
      }
    } else if (inputs.query.assetType == 'reviews') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('appreviews/' + inputs.query.filterValue + '?json=1')
          fetchFromSteam(url)
            .then(response => {

              if (response.query_summary != undefined) {
                return exits.success(response.query_summary);

            } else {
              console.log(response[appId]);
              return exits.error('Could not find review data');
            }

          })
          .catch (err => exits.error(err));
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
    } else if (inputs.query.assetType == 'trailers') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {

          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url)
            .then(response => {

              const appId = inputs.query.filterValue;
              const steamResponse = response[appId];

              if (steamResponse.data != undefined) {
                let trailer = steamResponse.data.movies[0].webm.max

                return exits.success(trailer);  // returns the Json to the client
              } else {
                console.log(response[appId]);
                return exits.error('Could not find trailer data');
              }

            })
            .catch (err => exits.error(err));

          } else {
            return exits.error('bad request - filterValue input error');
          }
        } else {
          return exits.error('bad request - filterType input error');
        }
          } // Input: Array of Steam app_ids.
            // Output: JSON with app details for all app_ids

            //The function takes in an array of Steam app_ids, builds a URL for
            //fetching the data for all app_ids in one call to Steam
          else if (inputs.query.assetType == 'getDetails') {
            if (inputs.query.filterType == 'app_id') {
              if (inputs.query.filterValue == undefined) { // Filtervalue kanske inte behöver vara med.
                url = url.concat('api/appdetails?appids=');

                const ids = inputs.body.data;
                //If the array has more than 1 app_id the function will iterate over all app_id:s except the last one
                //to concat the id with a ',' to separate the values. The last app_id will be concatinated without ','
                //after the loop.
                if (ids.length > 1){
                  for (i = 0; i < ids.length-1; i++) {
                    url = url.concat(ids[i]+',');
                  }
                }
                url = url.concat(ids[ids.length-1]);

                fetchFromSteam(url)
                  .then(response => {

                    return exits.success(review);  // returns the Json to the client
                  })
              } else {
                return exits.error('bad request - filterValue input error');
              }
            } else {
              return exits.error('bad request - filterType input error');
            }
          }else {
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
