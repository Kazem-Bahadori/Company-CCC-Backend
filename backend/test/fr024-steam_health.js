let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('fr024-steam_health', () =>{

  it('Test health.js for Steam machine', ()=> {
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
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});
});
