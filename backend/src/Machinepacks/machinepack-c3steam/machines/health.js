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
      result: 200,
      description: 'Server alive.',
    },
    exit: {
      result: 500,
      description: 'Server not alive.',
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
          resolve(response);
          //reject is for testing if api call does not work
          //reject(404);
        }, 300);
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
              reject();
            }
          })
          .catch(err => {
            reject();
          });
      });
    }
    ping(mockFetch)
      .then(response => exits.success(response))
      .catch(err => exits.error(err));
  }
}
