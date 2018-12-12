const fetch = require('node-fetch');

module.exports = {

  friendlyName: 'filters',
  description: 'The function should return a list of json objects representing assets provided by the implemented content provider.',
  cacheable: false,
  sync: false,
  inputs: {
    assetType: {
      example: 'price',
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
    let url = 'http://store.steampowered.com/'; // the main url of the twitch api


       /*
    * Return app data through the assetType 'gameInfo' string and filtertype 'appId'
    *
    * Base: /api/steam/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: 'gameInfo')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: appId)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    *
    * Example URL: ?assetType=gameInfo&filterType=appId&filterValue=404040
    * Description: Return game information (assetType) by specifying that paremeter is appId (filterType), about the appId
    * (filterValue) sent in the query.
    */
    if (inputs.assetType == 'gameInfo') {
      if (inputs.filterType == 'appId') {
        if (inputs.filterValue != undefined && inputs.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.filterValue)
          fetchFromSteam(url) //Gets all game info about specified appId.
            .then(response => {
              const appId = inputs.filterValue;
              const steamResponse = response[appId];

              if (steamResponse.data != undefined) {
                let price = {};
                if (steamResponse.data.is_free) {
                  price.final = 0;
                  price.discount_percent = 0;
                } else {
                  price = steamResponse.data.price_overview
                }

                let allInfo = {} //Body where the machine saves only the valuable data of the appId.

                allInfo['price'] = price;
                allInfo['pc_requirements'] = steamResponse.data.pc_requirements;
                allInfo['mac_requirements'] = steamResponse.data.mac_requirement;
                allInfo['linux_requirements'] = steamResponse.data.linux_requirements;
                allInfo['trailer'] = steamResponse.data.movies[0].webm.max;
                allInfo['description'] = steamResponse.data.short_description;
                allInfo['developer'] = steamResponse.data.developers;
                allInfo['publisher'] = steamResponse.data.publishers;
                allInfo['genres'] = steamResponse.data.genres;


                fetchFromSteam('http://store.steampowered.com/appreviews/' + appId + '?json=1') // Fetch reviews from steam about appId
            .then(review_response => {


              if (review_response.query_summary != undefined) {
                allInfo['reviews'] = review_response.query_summary
                return exits.success([allInfo]); // Return Json to the client


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
            return exits.error({
              description: 'bad request - filterValue input error',
              code: 400
            });
          }
        } else {
          return exits.error({
            description: 'bad request - filterType input error',
            code: 400
          });
        }

      }
      //~~~~~~~~~~~~~~~~~~~~~~~~~ price info, single appId. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return price overview through the assetType 'gameInfo' string and filtertype 'appId' for a filtervalue.
    *
    * Base: /api/steam/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: 'price')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: appId)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    *
    * Example URL: ?assetType=price&filterType=appId&filterValue=404040
    * Description: Return price overivew (assetType) by specifying that paremeter is appId (filterType), about the appId
    * (filterValue) sent in the query.
    */
      else if (inputs.assetType == 'price') {
      if (inputs.filterType == 'appId') {
        if (inputs.filterValue != undefined && inputs.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.filterValue)
          fetchFromSteam(url) //Gets price overview for specified appId
            .then(response => {
              const appId = inputs.filterValue;
              const steamResponse = response[appId];
              if (steamResponse.data != undefined) {
                let price = {};
                if (steamResponse.data.is_free) {
                  price.final = 0;
                  price.discount_percent = 0;
                } else {
                  price = steamResponse.data.price_overview
                }
                return exits.success([price]); //Returns Json to the client.
              } else {
                return exits.error({
                  description: 'Could not find price data',
                  code: 400
                });
              }
            })
            .catch (err => exits.error(err));
        } else {
          return exits.error({
            description: 'bad request - filterValue input error',
            code: 400
          });

        }
      } else {
        return exits.error({
          description: 'bad request - filterType input error',
          code: 400
        });
      }
    }
       //~~~~~~~~~~~~~~~~~~~~~~~~~ System requirements ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return system requirements through the assetType 'systemRequirements' string and filtertype 'appId' for a filtervalue.
    *
    * Base: /api/steam/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: 'system requirements')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: appId)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    *
    * Example URL: ?assetType=systemRequirements&filterType=appId&filterValue=404040
    * Description: Return system requirements (assetType) by specifying that paremeter is appId (filterType), about the appId
    * (filterValue) sent in the query.
    */
    else if (inputs.assetType == 'systemRequirements') {
      if (inputs.filterType == 'appId') {
        if (inputs.filterValue != undefined && inputs.filterValue!= null) {
          url = url.concat('api/appdetails?appids=' + inputs.filterValue)
          fetchFromSteam(url) //Gets the system requirements for specified appId
            .then(response => {

              const appId = inputs.filterValue;
              const steamResponse = response[appId]

              if (steamResponse.data != undefined) {

              let requirements = {
                pc_requirements: steamResponse.data.pc_requirements,
                mac_requirements: steamResponse.data.mac_requirements,
                linux_requirements: steamResponse.data.linux_requirements
              }

              return exits.success([requirements]);  // returns the Json to the client
            } else {
              return exits.error('Could not find requirement data');
            }

          })
          .catch (err => exits.error(err));
        } else {
          return exits.error({
            description: 'bad request - filterValue input error',
            code: 400
          });
        }
      } else {
        return exits.error({
          description: 'bad request - filterType input error',
          code: 400
        });
      }
    }
      //~~~~~~~~~~~~~~~~~~~~~~~~~ Reviews ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return reviews through the assetType 'reviews' string and filtertype 'appId' for a filtervalue.
    *
    * Base: /api/steam/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: 'reviews')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: appId)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    *
    * Example URL: ?assetType=reviews&filterType=appId&filterValue=404040
    * Description: Return system reviews (assetType) by specifying that paremeter is appId (filterType), about the appId
    * (filterValue) sent in the query.
    */
    else if (inputs.assetType == 'reviews') {
      if (inputs.filterType == 'appId') {
        if (inputs.filterValue != undefined && inputs.filterValue!= null) {
          url = url.concat('appreviews/' + inputs.filterValue + '?json=1')
          fetchFromSteam(url) //Gets reviews for specified appId
            .then(response => {

              if (response.query_summary != undefined) {
                return exits.success([response.query_summary]); //Returns Json to the client

            } else {
              return exits.error('Could not find review data');
            }

          })
          .catch (err => exits.error(err));
        } else {
          return exits.error({
            description: 'bad request - filterValue input error',
            code: 400
          });
        }
      } else {
        return exits.error({
          description: 'bad request - filterType input error',
          code: 400
        });
      }
    }
       //~~~~~~~~~~~~~~~~~~~~~~~~~ On twitch ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return appId for a game name from twitch through the assetType 'games' string and filtertype 'onTwitch' for a filtervalue.
    *
    * Base: /api/steam/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: 'games')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: 'onTwitch')
    *   - `filterValue` specifiy which app from twitch to get appId to, if available - input value: string (allowed: any)
    *
    * Example URL: ?assetType=games&filterType=onTwitch&filterValue=Rust
    * Description: Return appId (assetType) by specifying that paremeter is an app on twitch (filterType), for the name of a game
    * (filterValue) sent in the query.
    */
    else if (inputs.assetType == 'games') {
      if (inputs.filterType == 'onTwitch') {
        if (inputs.filterValue != undefined) {

          let games = require('./steam_games.json');
          let name = inputs.filterValue
          let gameObject
          let counter = 0;

          while (counter < games.length) {

            gameObject = games[counter]

            if (gameObject.name == name) {
              return exits.success([{ appId: gameObject['appid'] }]);  // returns the Json to the client
            }
            counter++
          }
          return exits.success([false])  // returns the Json to the client

        } else {
          return exits.error({
            description: 'bad request - filterValue input error',
            code: 400
          });
        }
      } else {
        return exits.error({
          description: 'bad request - filterType input error',
          code: 400
        });
      }
    }
      //~~~~~~~~~~~~~~~~~~~~~~~~~ Trailers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /*
    * Return trailer through the assetType 'trailers' string and filtertype 'appId' for a filtervalue.
    *
    * Base: /api/steam/filters
    * Options:
    *
    *   - `assetType` specify type of output - input value: string (allowed: 'trailers')
    *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: appId)
    *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
    *
    * Example URL: ?assetType=trailers&filterType=appId&filterValue=404040
    * Description: Return trailer (assetType) by specifying that paremeter is appId (filterType), for the appId
    * (filterValue) sent in the query.
    */
    else if (inputs.assetType == 'trailers') {
      if (inputs.filterType == 'appId') {
        if (inputs.filterValue != undefined && inputs.filterValue!= null) {

          url = url.concat('api/appdetails?appids=' + inputs.filterValue)
          fetchFromSteam(url) //Gets the information of the trailer
            .then(response => {

              const appId = inputs.filterValue;
              const steamResponse = response[appId];

              if (steamResponse.data != undefined) {
                let trailer = steamResponse.data.movies[0].webm.max

                return exits.success([trailer]);  // returns the Json to the client
              } else {
                return exits.error({
                  description: 'Could not find trailer data',
                  code: 400
                });
              }

            })
            .catch (err => exits.error(err));
          } else {
            return exits.error({
              description: 'bad request - filterValue input error',
              code: 400
            });
          }
        } else {
          return exits.error({
            description: 'bad request - filterType input error',
            code: 400
          });
        }
          }    //~~~~~~~~~~~~~~~~~~~~~~~~~ getDetails ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          /*
          * Return price overview through the assetType 'getDetails' string and filtertype 'appId' for a list of filtervalues.
          *
          * Base: /api/steam/filters
          * Options:
          *
          *   - `assetType` specify type of output - input value: string (allowed: 'getDetails')
          *   - `filterType` specify what paremeter that the query uses - input value: string (allowed: appId)
          *   - `filterValue` specifiy which steam app to get information about - input value: integer (allowed: any)
          *
          * Example URL: ?assetType=systemRequirements&filterType=appId&filterValue=404040
          * Description: Return system requirements (assetType) by specifying that paremeter is appId (filterType), about the appId
          * (filterValue) sent in the query.
          */
            else if (inputs.assetType == 'details') {
              if (inputs.filterType == 'appId') {
                if (inputs.filterValue == undefined) { // Filtervalue kanske inte behöver vara med.
                  url = url.concat('api/appdetails?appids=');
                  const ids = inputs['data'];
                  //If the array has more than 1 appId the function will iterate over all appId:s except the last one
                  //to concat the id with a ',' to separate the values. The last appId will be concatinated without ','
                  //after the loop
                  var i;
                  if (ids.length > 1){
                    for (i = 0; i < ids.length-1; i++) {
                      url = url.concat(ids[i]+',');
                    }
                  }
                  url = url.concat(ids[ids.length-1]);
                  url = url.concat('&filters=price_overview');
                  fetchFromSteam(url)
                    .then(response => {
                      return exits.success([response]);  // returns the Json to the client
                    })
                } else {
                  return exits.error({
                    description: 'bad request - filterValue input error',
                    code: 400
                  });
                }
              } else {
                return exits.error({
                  description: 'bad request - filterType input error',
                  code: 400
                });
              }
            }else {
              return exits.error({
                description: 'bad request - assetType input error',
                code: 400
              });
    }

//------------------------------------- Seperate functions ---------------------------------------------------------------

    //Does the call towards the twitch api
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
