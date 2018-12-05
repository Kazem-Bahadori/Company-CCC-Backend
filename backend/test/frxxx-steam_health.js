let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('frxxx-steam_health', () =>{

  it('Steam health', ()=> {
    let ok = true;
    return new Promise(function(resolve, reject){
      Steam.health().exec({
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
      //assert.isTrue(ok);
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});
});
