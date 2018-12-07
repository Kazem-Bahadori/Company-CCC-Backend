let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';

describe('fr025-get_stream', () =>{


  it('Get stream for game with filters.js', ()=> {
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
      expect(error.description).to.equal("no streams found - check spelling of game_id");
    });
});

it('Correct expected error when no value for filterValue with filters.js', ()=> {
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
    expect(error.description).to.equal("bad request - no game_id is given");
  });
});

it('Correct expected error when no context is given for streams with filters.js', ()=> {
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
    expect(error.description).to.equal("bad request - No context given");
  });
});

it('Correct expected error when no context is given for games with filters.js', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual'},
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
    expect(error.description).to.equal("bad request - No context given");
  });
});


it('Correct expected error when no game_id is found for streams with filters.js', ()=> {
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
    expect(error.description).to.equal("bad request - no game_id found");
  });
});

it('Correct expected error when no game_id is found for games with filters.js', ()=> {
  let ok = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'contextual'},
    body: {filter_by: 'top_games', quantity: 50}
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
    expect(error.description).to.equal("bad request - no game_id found");
  });
});

it('Correct expected error when requesting more than 100 streams with filters.js', ()=> {
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
    expect(error.description).to.equal("bad request - quantity must be between 1-100");
  });
});

it('Correct expected error when for no streams exist for chosen game_id with filters.js', ()=> {
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
    expect(error.description).to.equal("no streams found - check spelling of game_id");
  });
});

it('Correct expected error when incorrect filter_by with filters.js', ()=> {
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
    expect(error.description).to.equal("bad request - incorrect filter");
  });
});

it('Correct expected error when no value for filterType with filters.js', ()=> {
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
    expect(error.description).to.equal("bad request - filterType input error");
  });
});

  it('Get stream for game with content.js', ()=> {
    let ok = true;
    const inputs = {
      assetType: 'streams', filterType: 'game', filterValue: '57690'
    }

    return new Promise(function(resolve, reject){
      Twitch.content(inputs).exec({
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
      expect(error.description).to.equal("no streams found - check spelling of game_id");
    });
});

it('Correct expected error when no value for filterValue with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'streams', filterType: 'game'
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - no game_id is given");
  });
});

it('Correct expected error when no game_id is found for streams with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'streams', filterType: 'contextual', filter_by: 'game_id'
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - no game_id found");
  });
});

it('Correct expected error when no game_id is found for games with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'games', filterType: 'contextual', filter_by: 'top_games', quantity: 50
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - no game_id found");
  });
});

it('Correct expected error when requesting more than 100 streams with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'streams', filterType: 'contextual', filter_by: 'game_id', game_id: '57690', quantity: 101
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - quantity must be between 1-100");
  });
});

it('Correct expected error when for no streams exist for chosen game_id with filters.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'streams', filterType: 'contextual', filter_by: 'game_id', game_id: '57690', quantity: 10
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("no streams found - check spelling of game_id");
  });
});

it('Correct expected error when incorrect filter_by with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'streams', filterType: 'contextual', filter_by: 'not_game_id'
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - incorrect filter");
  });
});

it('Correct expected error when no value for filterType with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'streams'
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - filterType input error");
  });
});

});
