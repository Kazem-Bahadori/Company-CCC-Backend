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


    let url = 'http://store.steampowered.com/'; // the main url of the twitch api

   /*
    * Return app data through the assetType 'game_info' string and filtertype 'app_id'
    * 
    * Base: /api/steam/filters
    * Options:
    * 
    *   - `assetType` specify type of output - input value: string (allowed: 'game_info')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: app_id)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    * 
    * Example URL: ?assetType=game_info&filterType=app_id&filterValue=404040
    * Description: Return game information (assetType) by specifying that paremeter is app_id (filterType), about the app_id
    * (filterValue) sent in the query.
    */
    if (inputs.query.assetType == 'game_info') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //Gets all game info about specified app_id.
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

                let all_info = {} //Body where the machine saves only the valuable data of the app_id.

                all_info['price'] = price;
                all_info['pc_requirements'] = steamResponse.data.pc_requirements;
                all_info['mac_requirements'] = steamResponse.data.mac_requirement;
                all_info['linux_requirements'] = steamResponse.data.linux_requirements;
                all_info['trailer'] = steamResponse.data.movies[0].webm.max;
                all_info['description'] = steamResponse.data.short_description;
                all_info['developer'] = steamResponse.data.developers;
                all_info['publisher'] = steamResponse.data.publishers;
                all_info['genres'] = steamResponse.data.genres;

                fetchFromSteam('http://store.steampowered.com/appreviews/' + appId + '?json=1') // Fetch reviews from steam about app_id 
            .then(review_response => {


              if (review_response.query_summary != undefined) {
                all_info['reviews'] = review_response.query_summary
                return exits.success(all_info); //Return JSON to the client

              
            } else {
              return exits.error('Could not find review data'); //Returns JSON to the client
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


      //~~~~~~~~~~~~~~~~~~~~~~~~~ price info, single app_id. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return price overview through the assetType 'game_info' string and filtertype 'app_id' for a filtervalue.
    * 
    * Base: /api/steam/filters
    * Options:
    * 
    *   - `assetType` specify type of output - input value: string (allowed: 'price')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: app_id)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    * 
    * Example URL: ?assetType=price&filterType=app_id&filterValue=404040
    * Description: Return price overivew (assetType) by specifying that paremeter is app_id (filterType), about the app_id
    * (filterValue) sent in the query.
    */

      } else if (inputs.query.assetType == 'price') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //Gets price overview for specified app_id
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
                return exits.success(price); //Returns JSON to the client.
              } else {
                console.log(response[appId]);
                return exits.error('Could not find price data');
              }
              
            })
            .catch (err => exits.error(err));
        } else {
          return exits.error('bad request - filterValue input error');
        }
      } else {
        return exits.error('bad request - filterType input error');
      }
    } 
    
      //~~~~~~~~~~~~~~~~~~~~~~~~~ System requirements ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return system requirements through the assetType 'system_requirements' string and filtertype 'app_id' for a filtervalue.
    * 
    * Base: /api/steam/filters
    * Options:
    * 
    *   - `assetType` specify type of output - input value: string (allowed: 'system requirements')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: app_id)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    * 
    * Example URL: ?assetType=system_requirements&filterType=app_id&filterValue=404040
    * Description: Return system requirements (assetType) by specifying that paremeter is app_id (filterType), about the app_id
    * (filterValue) sent in the query.
    */
        
    else if (inputs.query.assetType == 'system_requirements') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //Gets the system requirements for specified app_id
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
    } 
    
      //~~~~~~~~~~~~~~~~~~~~~~~~~ Reviews ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return reviews through the assetType 'reviews' string and filtertype 'app_id' for a filtervalue.
    * 
    * Base: /api/steam/filters
    * Options:
    * 
    *   - `assetType` specify type of output - input value: string (allowed: 'reviews')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: app_id)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    * 
    * Example URL: ?assetType=reviews&filterType=app_id&filterValue=404040
    * Description: Return system reviews (assetType) by specifying that paremeter is app_id (filterType), about the app_id
    * (filterValue) sent in the query.
    */

    else if (inputs.query.assetType == 'reviews') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {
          url = url.concat('appreviews/' + inputs.query.filterValue + '?json=1')
          fetchFromSteam(url) //Gets reviews for specified app_id
            .then(response => {

              if (response.query_summary != undefined) {
                return exits.success(response.query_summary); //Returns JSON to the client
              
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
    }
    
      //~~~~~~~~~~~~~~~~~~~~~~~~~ On twitch ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return app_id for a game name from twitch through the assetType 'games' string and filtertype 'on_twitch' for a filtervalue.
    * 
    * Base: /api/steam/filters
    * Options:
    * 
    *   - `assetType` specify type of output - input value: string (allowed: 'games')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: 'on_twitch')
    *   - `filterValue` specifiy which app from twitch to get app_id to, if available - input value: string (allowed: any)
    * 
    * Example URL: ?assetType=games&filterType=on_twitch&filterValue=Rust
    * Description: Return app_id (assetType) by specifying that paremeter is an app on twitch (filterType), for the name of a game
    * (filterValue) sent in the query.
    */

    else if (inputs.query.assetType == 'games') {
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
    } 
    
      //~~~~~~~~~~~~~~~~~~~~~~~~~ Trailers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return trailer through the assetType 'trailers' string and filtertype 'app_id' for a filtervalue.
    * 
    * Base: /api/steam/filters
    * Options:
    * 
    *   - `assetType` specify type of output - input value: string (allowed: 'trailers')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: app_id)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    * 
    * Example URL: ?assetType=trailers&filterType=app_id&filterValue=404040
    * Description: Return trailer (assetType) by specifying that paremeter is app_id (filterType), for the app_id
    * (filterValue) sent in the query.
    */
    
    else if (inputs.query.assetType == 'trailers') {
      if (inputs.query.filterType == 'app_id') {
        if (inputs.query.filterValue != undefined && inputs.query.filterValue!= null) {

          url = url.concat('api/appdetails?appids=' + inputs.query.filterValue)
          fetchFromSteam(url) //Gets the information of the trailer
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
          } 
            //~~~~~~~~~~~~~~~~~~~~~~~~~ getDetails ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          /*
          * Return price overview through the assetType 'getDetails' string and filtertype 'app_id' for a list of filtervalues.
          * 
          * Base: /api/steam/filters
          * Options:
          * 
          *   - `assetType` specify type of output - input value: string (allowed: 'getDetails')
          *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: app_id)
          *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
          * 
          * Example URL: ?assetType=system_requirements&filterType=app_id&filterValue=404040
          * Description: Return system requirements (assetType) by specifying that paremeter is app_id (filterType), about the app_id
          * (filterValue) sent in the query.
          */ 
          else if (inputs.query.assetType == 'getDetails') {
            if (inputs.query.filterType == 'app_id') {
              if (inputs.query.filterValue == undefined) {
                url = url.concat('api/appdetails?appids=');

                const ids = inputs.body['data'];

                //If the array has more than 1 app_id the function will iterate over all app_id:s except the last one
                //to concat the id with a ',' to separate the values. The last app_id will be concatinated without ','
                //after the loop
                var i;
                if (ids.length > 1){
                  for (i = 0; i < ids.length-1; i++) {
                    url = url.concat(ids[i]+',');
                  }
                }
                url = url.concat(ids[ids.length-1]);
                url = url.concat('&filters=price_overview');

                console.log(url);

                fetchFromSteam(url) 
                  .then(response => {
      
                    return exits.success(response);  // returns the Json to the client 
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