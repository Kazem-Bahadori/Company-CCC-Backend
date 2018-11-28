let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';

describe('FRxxx: get_stream', () =>{


  it('Get stream for game', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: 'streams', filterType: 'game', filterValue: '57690'},
    }

    return new Promise(function(resolve, reject){
      Twitch.filters(inputs).exec({
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

it('Get stream for game', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams', filterType: 'game', filterValue: '506103'},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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

it('Correct error for no filter input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams', filterType: 'game'},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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
    expect(error).to.equal("bad request - no game_id is given");
  });
});

it('Correct error for no filter_by input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual'},
    body: {filter_by: 'wrong_filter'}
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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
    expect(error).to.equal("bad request - incorrect filter");
  });
});

it('Correct error for no filter input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams', filterType: 'contextual'},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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

it('Correct error for no filter input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams', filterType: 'contextual'},
    body: {filter_by: 'game_id'}
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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
    expect(error).to.equal("bad request - no game_id found");
  });
});

it('Correct error for no filter input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams', filterType: 'contextual'},
    body: {filter_by: 'game_id', game_id: '57690', quantity: 101}
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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
    expect(error).to.equal("bad request - quantity must be between 1-100");
  });
});

it('Correct error for no filter input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams', filterType: 'contextual'},
    body: {filter_by: 'game_id', game_id: '57690', quantity: 10}
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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
    expect(error).to.equal("no streams found - check spelling of game_id");
  });
});

it('Correct error for no filter input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams', filterType: 'contextual'},
    body: {filter_by: 'not_game_id'}
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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
    expect(error).to.equal("bad request - incorrect filter");
  });
});

it('Correct error for no filter input', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'streams'},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
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
    expect(error).to.equal("bad request - filterType input error");
  });
});

});
