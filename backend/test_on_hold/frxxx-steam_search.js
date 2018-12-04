let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('frxxx-steam_search', () =>{

  it('Steam search for game that does exist', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: 'gameId', queryString: 'Dota 2'},
    }

    return new Promise(function(resolve, reject){
      Steam.search(inputs).exec({
        error: function (error) {
          reject(error)
        },
        success: function (result) {
          resolve(ok);
        },
      });
    })
    .then((ok) =>{
      assert.isTrue(ok);
    })
    .catch((error) => {
      //expect(error).to.equal("bad request - filterValue input error");
    });
});

it('Steam search for game that does not exist', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'gameId', queryString: 'a game that does not exist'},
  }

  return new Promise(function(resolve, reject){
    Steam.search(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        resolve(ok);
      },
    });
  })
  .then((ok) =>{
    assert.isFalse(ok);
  })
  .catch((error) => {
    //expect(error).to.equal("bad request - filterValue input error");
  });
});

it('Correct error for no query string', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'gameId'},
  }

  return new Promise(function(resolve, reject){
    Steam.search(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        resolve(ok);
      },
    });
  })
  .then((ok) =>{
    assert.isFalse(ok);
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - queryString input error");
  });
});

it('Correct error for no asset type', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: ''},
  }

  return new Promise(function(resolve, reject){
    Steam.search(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        resolve(ok);
      },
    });
  })
  .then((ok) =>{
    assert.isFalse(ok);
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - assetType input error");
  });
});

});
