let propertyExists = true;
const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('FR065: get_game_info', () =>{
  it('Response body has correct properties', ()=> {
    const inputs = {
      query: {assetType: 'game_info', filterType: 'app_id', filterValue: '57690'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
        error: function (err) {
          console.log(err);
        },
        success: function (result) {
          if(!result.hasOwnProperty('price')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('pc_requirements')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('mac_requirements')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('linux_requirements')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('trailer')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('description')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('developer')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('publisher')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('genres')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('reviews')){
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

it('Response body has exactly 10 properties', ()=> {
    const inputs = {
      query: {assetType: 'game_info', filterType: 'app_id', filterValue: '57690'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
        error: function (err) {

          console.log(err);
        },
        success: function (result) {
          var counter = 0;
          for(var property in result){
            if(result.hasOwnProperty(property)){
              counter++;
            }
          }
          resolve(counter);
        },
      });
    })
    .then((counter) =>{
      expect(counter).to.equal(10);
    })
    .catch((error) => {
      assert.isNotOk(error);
    });
});

it('Response body properties are correctly formatted', ()=> {
let correctFormat = true;
    const inputs = {
      query: {assetType: 'game_info', filterType: 'app_id', filterValue: '57690'},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
        error: function (error) {
          reject(error);
          console.log(error);
        },
        success: function (result) {
          console.log(result);
          if(typeof(result.trailer) != 'string'){
            correctFormat = false;
          }
          if(typeof(result.description) != 'string'){
            correctFormat = false;
          }
          for(var i = 0; i < result.developer.length; i++){
            if(typeof(result.developer[i]) != 'string'){
              correctFormat = false;
            }
          }
          for(var j = 0; j < result.publisher.length; j++){
            if(typeof(result.publisher[j]) != 'string'){
              correctFormat = false;
            }
          }
          resolve(correctFormat);
        },
      });
    })
    .then((correctFormat) =>{
      assert.isTrue(correctFormat);
    })
    .catch((error) => {
      assert.isNotOk(error);
    });
});

});
