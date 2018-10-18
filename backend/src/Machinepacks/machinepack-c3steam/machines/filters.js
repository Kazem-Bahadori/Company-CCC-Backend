
var request = require("request")

var url = "http://api.steampowered.com/ISteamApps/GetAppList/v0001"

request({
    url: url,
    json: true
}, function (error, response, body) {

    //if (!error && response.statusCode === 200) {
        //console.log(JSON.stringify(body));
        //console.log(body) // Print the json response
    //}
});

module.exports = {


  friendlyName: 'filters',


  description: 'fetches data from steam using a filter',


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


  fn: function(inputs, exits
    /*``*/
  ) {
    console.log('Steam function triggered!')
    console.log(JSON.stringify(body));


    return exits.success();
  },



};