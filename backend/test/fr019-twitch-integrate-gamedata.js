let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import GameData from '../src/Machinepacks/machinepack-twitchintegrategamedata';

describe('fr019-twitch-integrate-data', () =>{

  it('Get top 5 games with filters.js', ()=> {
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

it('Get steam games with filters.js', ()=> {
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

it('Get contextual top_games with filters.js', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual'},
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
    expect(error).to.equal("no streams found - check spelling of game_id");
  });
});

it('Correct expected error when no value for filter_by with filters.js', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual'},
    body: {filter_by: 'none'}
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
    expect(error).to.equal("bad request - body filter_by input error");
  });
});

it('Correct expected error when no value for filterType with filters.js', ()=> {
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

it('Get top 5 games with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'games', filterType: 'top', filterValue: 5
  }

  return new Promise(function(resolve, reject){
    GameData.content(inputs).exec({
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

it('Get steam games with content.js', ()=> {
let ok = true;
const inputs = {
  assetType: 'games', filterType: 'category', filterValue: 'steamGame'
}

return new Promise(function(resolve, reject){
  GameData.content(inputs).exec({
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

it('Correct expected error when no value for filterType with content.js', ()=> {
let ok = true;
const inputs = {
  assetType: 'games'
}

return new Promise(function(resolve, reject){
  GameData.content(inputs).exec({
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

it('Correct expected error when no value for filterValue with content.js', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'category', filterValue: 'gamefromsteam'},
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
    expect(error).to.equal("bad request - filterValue input error");
  });
});

});
