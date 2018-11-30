let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';

describe('fr025-streamer_info', () =>{

  it('Correct fetch of streamer_info', ()=> {
    let correctFormat = true;
    const inputs = {
      query: {assetType: 'streamer_info', filterType: undefined, filterValue: 57690},
    }

    return new Promise(function(resolve, reject){
      Twitch.filters(inputs).exec({
        error: function (error) {
          reject(error)
        },
        success: function (result) {
          if(typeof(result) != 'object'){
              correctFormat = false;
          }
          resolve(correctFormat);
        },
      });
    })
    .then((correctFormat) =>{
      assert.isTrue(correctFormat);
    })
    .catch((error) => {
      expect(error).to.equal("bad request - filterValue input error");
    });
});

it('Correct error for incorrect iser id or filterType not empty', ()=> {
  const inputs = {
    query: {assetType: 'streamer_info', filterType: 'defined', filterValue: 57690},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        resolve(result);
      },
    });
  })
  .then((result) =>{
    //assert.isTrue(propertyExists);
  })
  .catch((error) => {
    expect(error).to.equal("bad request - incorrect user id or filterType not empty");
  });
});

it('Correct error for incorrect iser id or filterType not empty', ()=> {
  const inputs = {
    query: {},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        resolve(result);
      },
    });
  })
  .then((result) =>{
    //assert.isTrue(propertyExists);
  })
  .catch((error) => {
    expect(error).to.equal("bad request - assetType input error");
  });
});

});
