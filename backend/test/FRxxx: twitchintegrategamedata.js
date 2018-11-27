let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import GameData from '../src/Machinepacks/machinepack-twitchintegrategamedata';

describe('FRxxx: twitchintegrategamedata', () =>{


  it('Get top games', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: 'games', filterType: 'top', filterValue: 5},
    }

    return new Promise(function(resolve, reject){
      GameData.filters(inputs).exec({
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
      expect(error).to.equal("no streams found - check spelling of game_id");
    });
});

it('Get steam games', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'category', filterValue: 'steamGame'},
  }

  return new Promise(function(resolve, reject){
    GameData.filters(inputs).exec({
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
    expect(error).to.equal("no streams found - check spelling of game_id");
  });
});

it('Correct error for no filterType', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games'},
  }

  return new Promise(function(resolve, reject){
    GameData.filters(inputs).exec({
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
    expect(error).to.equal("bad request - filterType input error'");
  });
});


});
