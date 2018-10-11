const fetch = require('node-fetch');

module.exports = {


  friendlyName: 'health',


  description: 'pings the content provider',


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

    //Only for testing purpose
    function mockFetch() {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          const response = {
            data: 'exists'
          };
          console.log('Fetched data');
          resolve(response);
          //reject is for testing if api call does not work
          //reject(404);
        }, 300);
      });
    }

    function fetchFromTwitch() {
      return new Promise(function (resolve, reject) {
        let url = 'https://api.twitch.tv/helix/streamss';
        fetch(url, {
            headers: {
              'Client-ID': '3jxj3x3uo4h6xcxh2o120cu5wehsab'
            }
          })
        .then(response => resolve(response.json()))
      });
    }

    function ping(fetchFunction) {
      return new Promise(function (resolve, reject) {
        fetchFunction()
          .then(response => {
            if (response.data != null) {
              resolve();
            } else {
              const status = (response.status != null) ? response.status : 500;
              console.log('Status: ', status);
              reject();
            }
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    }
    ping(fetchFromTwitch)
      .then(response => exits.success(response))
      .catch(err => exits.error(err));
  }
}
