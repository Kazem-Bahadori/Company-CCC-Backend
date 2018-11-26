import Steam from '../../machinepack-c3steam';
import Twitch from '../../machinepack-c3twitch';
//import { promises } from 'fs';
//import { resolve } from 'path';
//import { get } from 'https';

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
    if (inputs.query.assetType == "games") { // if you are searching for games on twitch
      if (inputs.query.queryString != undefined) {
       

        getTwitchData()
          .then(function (twitchData) {           
            return new Promise((resolve, reject) => {
              let steamInputs = [];
              twitchData.games.forEach(element => {
                steamInputs.push({
                  query: {
                    assetType: 'gameId',
                    queryString: element.name
                  }
                });
              })
              resolve(steamInputs);
            });

          }).then(function (steamInputs) {
            console.log('test oscar 3')
            const promises = [];
            //steamInputs.forEach(element => {
            for (let game in steamInputs) {
              //console.log(steamInputs[game]);
              
              promises.push(new Promise((resolve, reject) => {
                Steam.search(steamInputs[game]).exec({

                  error: function (err) {
                    console.log('ERROOORRR')
                    reject(err);
                  },
                  // OK.
                  success: function (result) {
                    //console.log(result);
                    resolve(result)              
                  }
                })
              })
              )              
            }
            return promises;
          })
          .then(function (promises) {
            Promise.all(promises)
              .then(data => {
                
                //console.log(data);
                return exits.success(data);
              })
          })          

        function getTwitchData() {

          return new Promise((resolve, reject) => {
            Twitch.search(inputs).exec({
              // An unexpected error occurred.
              error: function (err) {
                reject(err);
              },
              // OK.
              success: function (result) {
                resolve(result);
              }
            })
          })
        }
      }
    }
  }
}