let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';

describe('fr024-twitch_health', () =>{

  it('Twitch health', ()=> {
    let ok = true;
    return new Promise(function(resolve, reject){
      Twitch.health().exec({
        error: function (error) {
          reject(error)
        },
        success: function (result) {
          if(result == null || result == undefined){
            ok = false;
          }
          resolve(ok);
        },
      });
    })
    .then((result) =>{
      //assert.isTrue(ok);
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});
});
