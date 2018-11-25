let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';

describe('FRxxx: twitch_health', () =>{

  it('Twitch health', ()=> {

    return new Promise(function(resolve, reject){
      Twitch.health().exec({
        error: function (error) {
          reject(error)
        },
        success: function (result) {
          resolve(result);
        },
      });
    })
    .then((result) =>{
      //assert.isTrue(correctFormat);
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});
});
