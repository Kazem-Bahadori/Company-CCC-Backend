let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('FRxxx: steam_search', () =>{
  it('Response body has correct properties', ()=> {
    let propertyExists = true;

    const inputs = {
      query: {assetType: 'gameId', queryString: 'Dota 2'},
    }

    return new Promise(function(resolve, reject){
      Steam.search(inputs).exec({
        error: function (err) {
          console.log(err);
        },
        success: function (result) {
          if(!result.hasOwnProperty('appId')){
            propertyExists = false;
          }
          resolve(propertyExists);
        },
      });
    })
    .then((result) =>{
      assert.isTrue(propertyExists);
    })
    .catch((error) => {
      assert.isNotOk(error);
    });
});

it('Correct error handling for no queryString', ()=> {

    const inputs = {
      query: {assetType: 'gameId', queryString: ''},
    }

    return new Promise(function(resolve, reject){
      Steam.search(inputs).exec({
        error: function (error) {
          reject(error);
        },
        success: function (result) {
          resolve(result);
        },
      });
    })
    .then((result) =>{

    })
    .catch((error) => {
      expect(error.description).to.equal("bad request - queryString input error");
      expect(error.code).to.equal(400);

    });
});

it('Correct error handling for no assetType', ()=> {

    const inputs = {
      query: {assetType: ''},
    }
    return new Promise(function(resolve, reject){
      Steam.search(inputs).exec({
        error: function (error) {
          reject(error);
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
      expect(error.code).to.equal(400);
    });
});

});
