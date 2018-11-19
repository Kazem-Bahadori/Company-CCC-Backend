const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('B201 TEST', () =>{
    it('Testing game price from Steam', ()=> {

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        Steam.filters(inputs).exec({

          // An unexpected error occurred.
          error: function (err) {

            console.log(err);
          },
          // OK.
          success: function (result) {
            console.log(result.final_formatted);
            assert.property(result, 'final_formatted1')

          },
        });
    });
  });
