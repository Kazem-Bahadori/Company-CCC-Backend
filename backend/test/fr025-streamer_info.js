let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';

describe('fr025-streamer_info', () =>{

  it('Correct fetch of streamer_info with filters.js', ()=> {
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
      expect(error.description).to.equal("bad request - filterValue input error");
    });
});

it('Correct expected error when incorrect user id or filterType not empty with filters.js', ()=> {
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

  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - incorrect user id or filterType not empty");
  });
});

it('Correct expected error when incorrect user id or filterType not empty with filters.js', ()=> {
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

  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - assetType input error");
  });
});

//content
it('Correct fetch of streamer_info with content.js', ()=> {
  let correctFormat = true;
  const inputs = {
    assetType: 'streamerInfo', filterType: 'streamerId', filterValue: 57690
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - filterValue input error");
  });
});

it('Correct expected error when incorrect user id or filterType not empty with content.js', ()=> {
const inputs = {
  assetType: 'streamerInfo', filterType: 'streamerId', filterValue: 57690
}

return new Promise(function(resolve, reject){
  Twitch.content(inputs).exec({
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
  expect(error.description).to.equal("bad request - incorrect user id or filterType not empty");
});
});

it('Correct expected error when incorrect user id or filterType not empty with content.js', ()=> {
const inputs = {
  assetType: 'streamerInfo'
}

return new Promise(function(resolve, reject){
  Twitch.content(inputs).exec({
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
  expect(error.description).to.equal("bad request - assetType input error");
});
});

});
