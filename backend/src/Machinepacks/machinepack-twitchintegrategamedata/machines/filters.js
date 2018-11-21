import Steam from '../../machinepack-c3steam';
import Twitch from '../../machinepack-c3twitch';
module.exports = {


  friendlyName: 'filters',


  description: '',


  cacheable: false,


  sync: false,


  inputs: {

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

    if (inputs.query.assetType == 'games') {
      if (inputs.query.filterType == 'top') {
        const amount = inputs.query.filterValue != undefined ? inputs.query.filterValue : 20;
        getTopGames(amount)
          .then(games => {
            return exits.success(games);
          })
          .catch(err => {
            return exits.error(err);
          });
      } else if (inputs.query.filterType === 'category') {
        if (inputs.query.filterValue === 'steamGame') {

          getTopGames(100)
            .then(games => {
              let steamGames = games.filter(game => game.steam != false);
              if (Object.keys(steamGames).length > 20) {
                steamGames = steamGames.slice(0, 20);
              }
              return exits.success(steamGames);
            })
            .catch(err => {
              return exits.error(err);
            });
        } else {
          return exits.error('bad request - filterType input error');
        }
      }
    }

    //------------------------------------- Seperate functions ---------------------------------------------------------------

    /*
      
    */
    function getTopGames(amount) {
      return new Promise((resolve, reject) => {
        if (amount >= 1 && amount <= 100) { // each twitch-call only accepts numbers between 1-100.
          const inputs = {
            query: {
              assetType: 'games',
              filterType: 'top',
              filterValue: amount
            }
          }
          return new Promise((resolve, reject) => {
            Twitch.filters(inputs).exec({
              // An unexpected error occurred.
              error: function (err) {
                reject(err);
              },
              // OK.
              success: function (result) {

                resolve(result)
                //return exits.success(result);

              },
            });
          })
            .then(response => {
              gamesIsOnSale(response.data)

                .then(res => resolve(res))
                .catch(err => reject(err));
            });

        } else {
          return exits.error('bad request - filtervalue for top games must be between 1-100')
        }
      })
    }


    /*
    
    */
    function getSteamID(nameOfGames) {
      const inputs = {
        query: {
          assetType: 'games',
          filterType: 'on_twitch',
          filterValue: nameOfGames
        }
      }
      console.log(nameOfGames)
      return new Promise((resolve, reject) => {
        let count = 0
        nameOfGames.data.forEach(function (element) {
          inputs.query.filterValue = element
          Steam.filters(inputs).exec({
            // An unexpected error occurred.
            error: function (err) {
              reject(err);
            },
            // OK.
            success: function (result) {
              console.log(result)
              if(result != false){
                nameOfGames.data[count].steam = result
              } else{
                nameOfGames.data[count].steam = false
              }
              count = count +1
              resolve(result);
            }
          })
        });
        /* Steam.filters(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            reject(err);
          },
          // OK.
          success: function (result) {
            resolve(result);
          },
        }); */
      });
    }

    /*
      
    */
    function gamesIsOnSale(twitchGames) {
      const promises = [];
      const games = twitchGames;
      let IDs = []; //list to save appid's in
      let names = {data:[]}; //list to save the game names in
      
      promises.push(new Promise(function (resolve, reject) {
        games.forEach(function (element) {
          names.data.push({ 'name': element.name})
        });
        console.log(names)
        getSteamID(names)
            .then(game => {
              if (game.appId != undefined) {
                console.log(game.appId)
                IDs.push(game.appId)
                resolve(game.appId)
              } else {
                resolve(game);
              }
            });
      })
      );

      
      return new Promise((resolve, reject) => {
        Promise.all(promises).then(values => {

          getSteamData(IDs)
                  .then(data => {
                    resolve(data)
                  })
                  .catch(() => resolve(false));

          for (let i = 0; i < games.length; i++) {
            games[i]['steam'] = values[i];
          }
          console.log(IDs)
          resolve(games);
        })
      });
    }

    /*
      
    */
    function getSteamData(appId) {
      const inputs = {
        query: {
          assetType: 'price',
          filterType: 'app_id',
          filterValue: appId
        }
      }
      return new Promise((resolve, reject) => {

        console.log(appId)
        return function (result) {
          resolve({ 'appid': appId});
        }
        /* Steam.filters(inputs).exec({
          // An unexpected error occurred.
          error: function (err) {
            reject(err);
          },
          // OK.
          success: function (result) {
            resolve({ 'appid': appId, price: result });
          },
        }); */
      });
    }
  },
};