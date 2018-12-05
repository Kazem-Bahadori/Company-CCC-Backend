let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import GameData from '../src/Machinepacks/machinepack-twitchintegrategamedata';

describe('frxxx-twitchintegrategamedata', () =>{

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

it('Correct get contextual game error', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual', filterValue: 'steamGame'},
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
    expect(error).to.equal("bad request - No context given");
  });
});

it('Get contextual top_games', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual', filterValue: 'steamGame'},
    body: {filter_by: 'top_games'}
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
    expect(error).to.equal("bad request - No context given");
  });
});

it('Get contextual steamgame', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual', filterValue: 'steamGame'},
    body: {filter_by: 'steamgame'}
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
    expect(error).to.equal("bad request - No context given");
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
    expect(error).to.equal("bad request - filterType input error");
  });
});


});
