module.exports = {


  friendlyName: 'search',


  description: 'Searches for content from twitch',


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
    return exits.success('Twitch Node-machine search säger hej!');
  },



};
