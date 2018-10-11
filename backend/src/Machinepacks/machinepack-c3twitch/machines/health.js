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
    const mockFetch = new Promise(function (resolve, reject) {
      setTimeout(() => {
        const response = {
          data: 'exists'
        };
        resolve(response);
        //reject is for testing if api call does not work
        //reject(404);
      }, 300);
    });

    const fetchFromTwitch = new Promise(function (resolve, reject) {
      let url = 'https://api.twitch.tv/helix/streams';
      fetch(url, {
          headers: {
            'Client-ID': '3jxj3x3uo4h6xcxh2o120cu5wehsab'
          }
        })
        .then(response => response.json())
        .then(response => {
          if (response.data != null) {
            resolve();
          } else {
            const status = (response.status != null) ? response.status : 500;
            reject(status);
          }
        })
    });

    function ping(fetchFunction) {
      return new Promise(function (resolve, reject) {
        fetchFunction.then(value => {
            resolve(value);
          })
          .catch(err => reject(err));
      });
    }
    return exits.success(ping(fetchFromTwitch));
  }
}
