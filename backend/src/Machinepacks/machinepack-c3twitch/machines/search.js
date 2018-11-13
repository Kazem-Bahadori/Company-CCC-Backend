const fetch = require('node-fetch')
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
    queryString : {
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

    if (inputs.query.assetType == "games"){ // if you are searching for games on twitch
      if (inputs.query.queryString != undefined){ //Checks that filtervalue isn't left empty
        url = url.concat('games?query=' + inputs.query.queryString ) //adds the searchword to the url
        searchOnTwitch(url) //calls the searchOnTwitch function
        .then( response => { //takes the response from the searchOnTwitch function

          response.games.forEach(function(element) { //Changes the output recived from twitch
            element.id = element._id;
            delete element._id; 
            element.box_art_url = element.box.large;
            delete element.box;
            delete element.logo;
            delete element.localized_name;
            delete element.locale;
            delete element.giantbomb_id;
            //element.steam = getSteamID(element.name);
          });

          
          
          /*
          var results = response['games'];  //Sorts the array
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
        
          return exits.success(response);  // returns the response to the client
        })
      } else {
        return exits.error('bad request - no queryString  given')
      }
    } else {
      return exits.error('bad request - incorrect assetType')
    }


    /*
    Hjälp för hur man arbetar med javascript

    //Hur man definierar variabler i modern javascript
    let toChange = "unchanged";
    const cannotBeChanged = 0;

    // Hur man skickar med parametrar till en promise
    function timeOut(time, value) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          toChange = value;
          resolve(toChange);
        }, time);
      });
    }

    //Ett sätt att vänta på massa anrop är klara innan man skriver ut värdet
    Promise.all([timeOut(1000, 'hej'), promise1, promise1])
      .then(values => {
        console.log(values);
      });
    
    //VAD BETYDER PILEN?!?!?
    promise1
      .then(value => {
        return value;
        //console.log(value);
        // expected output: "foo"
      });

    //Pilen är ett snabbare (coolare) sätt att skriva detta
    promise1
      .then(function (value) {
        console.log(value);
        return exits.success(value);
      });
    console.log(toChange);
    */
    function searchOnTwitch(url) { //Sends the url with the id 
      return new Promise(function (resolve, reject) {
        fetch(url, { headers: { 'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': '3jxj3x3uo4h6xcxh2o120cu5wehsab' } })
          .then(function (response) {
            resolve(response.json())
          })
      });
    }
   /* function getSteamID(nameOfGame) {
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
    } */
  },
};
