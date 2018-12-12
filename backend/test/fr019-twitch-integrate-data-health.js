let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import GameData from '../src/Machinepacks/machinepack-twitchintegrategamedata';

describe('fr019-twitch-integrate-data-health', () =>{

  it('Test health.js for twitch-integrate-data machine', ()=> {
    let ok = true;
    return new Promise(function(resolve, reject){
      GameData.health().exec({
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
    .then((ok) =>{
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});
});
