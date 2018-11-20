const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('B201 TEST', () =>{
    it('Testing game price from Steam', ()=> {
    let ok = false;


        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            // An unexpected error occurred.
            error: function (err) {

              console.log(err);
            },
            // OK.
            success: function (result) {

              console.log(result);
              console.log('innan');
              console.log(ok);
              if(result.hasOwnProperty('final_formatted')){
                ok = true
              }
              console.log(ok);
              console.log('efter');
              resolve(ok);
            },
          });
        })
        .then((result) =>{
          assert.isTrue(ok);
        })
        .catch((error) => {
          assert.isNotOk(error);
        });
    });
  });
