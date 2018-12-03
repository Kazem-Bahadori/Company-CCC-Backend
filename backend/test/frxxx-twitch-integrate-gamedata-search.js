let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import GameData from '../src/Machinepacks/machinepack-twitchintegrategamedata';

describe('frxxx-twitchintegrategamedata-search', () =>{

  it('Get top games', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: "games", filterType: '', queryString: "fifa"},
    }

    return new Promise(function(resolve, reject){
      GameData.search(inputs).exec({
        error: function (error) {
          reject(error)
        },
        success: function (result) {
          console.log(result);
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
      expect(error.description).to.equal('');
    });
});

it('Correct error for no queryString', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: "games", filterType: '', queryString: ''},
  }

  return new Promise(function(resolve, reject){
    GameData.search(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        console.log(result);
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
    expect(error.description).to.equal('bad request - queryString input error');
  });
});

it('Correct error for no assetType', ()=> {
  let ok = true;
  const inputs = {
    query: {filterType: ''},
  }

  return new Promise(function(resolve, reject){
    GameData.search(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        console.log(result);
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
    expect(error.description).to.equal('bad request - assetType input error');
  });
});
});
