let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';

describe('FRxxx: twitch_search', () =>{

  it('Response has correct properties', ()=> {
    let propertyExists = true;
    const inputs = {
      query: {assetType: 'games', queryString: 'fifa'},
    }

    return new Promise(function(resolve, reject){
      Twitch.search(inputs).exec({
        error: function (error) {
          reject(error);
        },
        success: function (result) {
          if(!result.hasOwnProperty('games')){
            propertyExists = false;
          }
          for(var i = 0; i < result.games.length; i++){
            if(!result.games[i].hasOwnProperty('name')){
              propertyExists = false;
            }
            if(!result.games[i].hasOwnProperty('popularity')){
              propertyExists = false;
            }
            if(!result.games[i].hasOwnProperty('id')){
              propertyExists = false;
            }
            if(!result.games[i].hasOwnProperty('box_art_url')){
              propertyExists = false;
            }
          }
          resolve(propertyExists);
        },
      });
    })
    .then((propertyExists) =>{
      assert.isTrue(propertyExists);
    })
    .catch((error) => {
      //expect(error).to.equal("bad request - filterValue input error");
    });
});

it('Correct error for no query string', ()=> {
  const inputs = {
    query: {assetType: 'games', queryString: ''},
  }

  return new Promise(function(resolve, reject){
    Twitch.search(inputs).exec({
      error: function (error) {
        reject(error);
      },
      success: function (result) {
        resolve(propertyExists);
      },
    });
  })
  .then((propertyExists) =>{
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - queryString input error");
    expect(error.code).to.equal(400);
  });
});

it('Every stream has correct proper', ()=> {
  let propertyExists = true;
  const inputs = {
    query: {assetType: 'streams', queryString: 'fifa'},
  }

  return new Promise(function(resolve, reject){
    Twitch.search(inputs).exec({
      error: function (error) {
        reject(error);
      },
      success: function (result) {
        if(!result.hasOwnProperty('streams')){
          propertyExists = false;
        }
        for(var i = 0; i < result.streams.length; i++){
          if(!result.streams[i].hasOwnProperty('_id')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('game')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('broadcast_platform')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('community_id')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('community_ids')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('viewers')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('video_height')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('average_fps')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('delay')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('created_at')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('is_playlist')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('stream_type')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('preview')){
            propertyExists = false;
          }
          if(!result.streams[i].hasOwnProperty('channel')){
            propertyExists = false;
          }

        }
        resolve(propertyExists);
      },
    });
  })
  .then((propertyExists) =>{
    assert.isTrue(propertyExists);
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - queryString input error");
    expect(error.code).to.equal(400);
  });
});

it('Correct error for no query string for streams', ()=> {
  const inputs = {
    query: {assetType: 'streams', queryString: ''},
  }

  return new Promise(function(resolve, reject){
    Twitch.search(inputs).exec({
      error: function (error) {
        reject(error);
      },
      success: function (result) {
        resolve(propertyExists);
      },
    });
  })
  .then((propertyExists) =>{
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - queryString input error");
    expect(error.code).to.equal(400);
  });
});

it('Correct error for no assetType', ()=> {
  const inputs = {
    query: {},
  }

  return new Promise(function(resolve, reject){
    Twitch.search(inputs).exec({
      error: function (error) {
        reject(error);
      },
      success: function (result) {
        resolve(propertyExists);
      },
    });
  })
  .then((propertyExists) =>{
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - incorrect assetType");
    expect(error.code).to.equal(400);
  });
});

});
