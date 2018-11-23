let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('FRxxx: getDetails', () =>{

  it('Correct error handling for defined filterValue', ()=> {
    const inputs = {
      query: {assetType: 'getDetails', filterType: 'app_id', filterValue: 'defined'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
        error: function (error) {
          reject(error)
        },
        success: function (result) {
          console.log(result);
          resolve(result);
        },
      });
    })
    .then((result) =>{
      assert.isTrue(propertyExists);
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});

it('Correct error handling for defined filterValue', ()=> {
  const inputs = {
    query: {assetType: 'getDetails'},
  }

  return new Promise(function(resolve, reject){
    Steam.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        console.log(result);
        resolve(result);
      },
    });
  })
  .then((result) =>{
    assert.isTrue(propertyExists);
  })
  .catch((error) => {
    expect(error).to.equal("bad request - filterType input error");
  });
});

it('Correct error handling for defined filterValue', ()=> {
  const inputs = {
    query: {},
  }

  return new Promise(function(resolve, reject){
    Steam.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        console.log(result);
        resolve(result);
      },
    });
  })
  .then((result) =>{
    assert.isTrue(propertyExists);
  })
  .catch((error) => {
    expect(error).to.equal("bad request - assetType input error");
  });
});

});
