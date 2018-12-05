let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('fr027-getDetails', () =>{


  it('Get details of several games', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: 'getDetails', filterType: 'app_id'},
      body: {data: ['34543,6434,4656,3455']}
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
      expect(error).to.equal("bad request - filterValue input error");
    });
});

  it('Correct error handling for defined filterValue', ()=> {
    const inputs = {
      query: {assetType: 'getDetails', filterType: 'app_id', filterValue: 'defined'},
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
      expect(error).to.equal("bad request - filterValue input error");
    });
});

it('Correct error handling for defined filterValue', ()=> {
  const inputs = {
    query: {assetType: 'getDetails'},
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
    expect(error).to.equal("bad request - filterType input error");
  });
});

it('Correct error handling for defined filterValue', ()=> {
  const inputs = {
    query: {},
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
    expect(error).to.equal("bad request - assetType input error");
  });
});

//content
it('Content: Get details of several games', ()=> {
  let ok = true;
  const inputs = {
    assetType: 'details', filterType: 'appId', data: ['34543,6434,4656,3455']
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
    expect(error).to.equal("bad request - filterValue input error");
  });
});

it('Content: Correct error handling for defined filterValue', ()=> {
  const inputs = {
    assetType: 'details', filterType: 'appId', filterValue: 'defined'
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
    expect(error).to.equal("bad request - filterValue input error");
  });
});

it('Content: Correct error handling for defined filterValue', ()=> {
const inputs = {
  assetType: 'details'
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
  expect(error).to.equal("bad request - filterType input error");
});
});

it('Content: Correct error handling for defined filterValue', ()=> {
const inputs = {

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
  expect(error).to.equal("bad request - assetType input error");
});
});

});
