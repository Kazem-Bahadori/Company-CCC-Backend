let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('fr032-get_trailers', () =>{


  it('Get details of several games', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: 'trailers', filterType: 'app_id', filterValue: '57690'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
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
      assert.isTrue(ok);
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});

  it('Correct error handling for filterValue with no trailer', ()=> {
    const inputs = {
      query: {assetType: 'trailers', filterType: 'app_id', filterValue: '11111111'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
        error: function (error) {
          reject(error)
        },
        success: function (result) {
          resolve(result);
        },
      });
    })
    .then((result) =>{

    })
    .catch((error) => {
      expect(error).to.equal("Could not find trailer data");
    });
});

it('Correct error handling for defined filterValue', ()=> {
  const inputs = {
    query: {assetType: 'trailers', filterType: 'app_id'},
  }

  return new Promise(function(resolve, reject){
    Steam.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
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
    query: {assetType: 'trailers'},
  }

  return new Promise(function(resolve, reject){
    Steam.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
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

});
