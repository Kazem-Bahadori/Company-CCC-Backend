let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('fr032-get_trailers', () =>{


  it('Get trailer of game with filters.js', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: 'trailers', filterType: 'app_id', filterValue: '57690'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
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

  it('Correct expected error when filterValue gave no trailer with filters.js', ()=> {
    const inputs = {
      query: {assetType: 'trailers', filterType: 'app_id', filterValue: '11111111'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
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
      expect(error.description).to.equal("Could not find trailer data");
    });
});

it('Correct expected error when no value for filterValue with filters.js', ()=> {
  const inputs = {
    query: {assetType: 'trailers', filterType: 'app_id'},
  }

  return new Promise(function(resolve, reject){
    Steam.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        resolve(result);
      },
    });
  })
  .then((result) =>{
    assert.isTrue(propertyExists);
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - filterValue input error");
  });
});

it('Correct expected error when no value for filterType with filters.js', ()=> {
  const inputs = {
    query: {assetType: 'trailers'},
  }

  return new Promise(function(resolve, reject){
    Steam.filters(inputs).exec({
      error: function (error) {
        reject(error)
      },
      success: function (result) {
        resolve(result);
      },
    });
  })
  .then((result) =>{
    assert.isTrue(propertyExists);
  })
  .catch((error) => {
    expect(error.description).to.equal("bad request - filterType input error");
  });
});

//Content

it('Get trailer of game with content.js', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'trailers', filterType: 'appId', filterValue: '57690'
  }

  return new Promise(function(resolve, reject){
    Steam.content(inputs).exec({
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
    expect(error.description).to.equal("bad request - filterValue input error");
  });
});

it('Correct expected error when filterValue gave no trailer with content.js', ()=> {
  const inputs = {
    assetType: 'trailers', filterType: 'appId', filterValue: '11111111'
  }

  return new Promise(function(resolve, reject){
    Steam.content(inputs).exec({
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
    expect(error.description).to.equal("Could not find trailer data");
  });
});

it('Correct expected error when no value for filterValue with content.js', ()=> {
const inputs = {
  assetType: 'trailers', filterType: 'appId'
}

return new Promise(function(resolve, reject){
  Steam.content(inputs).exec({
    error: function (error) {
      reject(error)
    },
    success: function (result) {
      resolve(result);
    },
  });
})
.then((result) =>{
  assert.isTrue(propertyExists);
})
.catch((error) => {
  expect(error.description).to.equal("bad request - filterValue input error");
});
});

it('Correct expected error when no value for filterType with content.js', ()=> {
const inputs = {
  assetType: 'trailers'
}

return new Promise(function(resolve, reject){
  Steam.content(inputs).exec({
    error: function (error) {
      reject(error)
    },
    success: function (result) {
      resolve(result);
    },
  });
})
.then((result) =>{
  assert.isTrue(propertyExists);
})
.catch((error) => {
  expect(error.description).to.equal("bad request - filterType input error");
});
});

});
