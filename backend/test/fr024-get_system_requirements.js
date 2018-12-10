const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';


describe('fr024-get_system_requriments', () =>{

    it('JSON response body has correct properties when fetching system requirements with filters.js', ()=> {
      let propertyExists = true;

      const inputs = {
        query: {assetType: 'system_requirements', filterType: 'app_id', filterValue: '57690'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
          error: function (err) {

          },
          success: function (result) {
            if(!result.hasOwnProperty('pc_requirements')){
              propertyExists = false;
            }
            if(!result.hasOwnProperty('mac_requirements')){
              propertyExists = false;
            }
            if(!result.hasOwnProperty('linux_requirements')){
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

    it('JSON response body has exactly 3 properties when fetching system requirements with filters.js', ()=> {
      let propertyExists = false;

      const inputs = {
        query: {assetType: 'system_requirements', filterType: 'app_id', filterValue: '57690'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
          error: function (err) {

            (err);
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
        expect(counter).to.equal(3);
      })
      .catch((error) => {
        assert.isNotOk(error);
      });
  });

  it('JSON response body properties are correctly formatted when fetching system requirements with filters.js', ()=> {
  let correctFormat = true;

      const inputs = {
        query: {assetType: 'system_requirements', filterType: 'app_id', filterValue: '57690'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
          error: function (err) {

          },
          success: function (result) {
            if(result.pc_requirements.length != 0){
              if(typeof(result.pc_requirements) != 'object'){
                correctFormat = false;
              }
              if(!result.pc_requirements.hasOwnProperty('minimum')){
                correctFormat = false;
              }
              if(!result.pc_requirements.hasOwnProperty('recommended')){
                correctFormat = false;
              }
            }

            if(result.mac_requirements.length != 0){
              if(typeof(result.mac_requirements) != 'object'){
                correctFormat = false;
              }
              if(!result.mac_requirements.hasOwnProperty('minimum')){
                correctFormat = false;
              }
              if(!result.mac_requirements.hasOwnProperty('recommended')){
                correctFormat = false;
              }
            }

            if(result.linux_requirements != 0){
              if(typeof(result.linux_requirements) != 'object'){
                correctFormat = false;
              }
              if(!result.linux_requirements.hasOwnProperty('minimum')){
                correctFormat = false;
              }
              if(!result.linux_requirements.hasOwnProperty('recommended')){
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

  it('Correct expected error when no value for filterValue with filters.js', ()=> {

      const inputs = {
        query: {assetType: 'system_requirements', filterType: 'app_id'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
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
        expect(error.description).to.equal("bad request - filterValue input error");
      });
  });

  it('Correct expected error when no value for filterType with filters.js', ()=> {

      const inputs = {
        query: {assetType: 'system_requirements'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
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
        expect(error.description).to.equal("bad request - filterType input error");
      });
  });

  //Content

  it('JSON response body has correct properties when fetching system requirements with content.js', ()=> {
    let propertyExists = true;

    const inputs = {
      assetType: 'systemRequirements', filterType: 'appId', filterValue: '57690'
    }

    return new Promise(function(resolve, reject){
      Steam.content(inputs).exec({
        error: function (err) {

        },
        success: function (result) {
          if(!result.hasOwnProperty('pc_requirements')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('mac_requirements')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('linux_requirements')){
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

  it('JSON response body has exactly 3 properties when fetching system requirements with content.js', ()=> {
    let propertyExists = false;

    const inputs = {
      assetType: 'systemRequirements', filterType: 'appId', filterValue: '57690'
    }

    return new Promise(function(resolve, reject){
      Steam.content(inputs).exec({
        error: function (err) {


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
      expect(counter).to.equal(3);
    })
    .catch((error) => {
      assert.isNotOk(error);
    });
});

it('JSON response body properties are correctly formatted when fetching system requirements with content.js', ()=> {
let correctFormat = true;

    const inputs = {
      assetType: 'systemRequirements', filterType: 'appId', filterValue: '57690'
    }

    return new Promise(function(resolve, reject){
      Steam.content(inputs).exec({
        error: function (err) {


        },
        success: function (result) {
          if(result.pc_requirements.length != 0){
            if(typeof(result.pc_requirements) != 'object'){
              correctFormat = false;
            }
            if(!result.pc_requirements.hasOwnProperty('minimum')){
              correctFormat = false;
            }
            if(!result.pc_requirements.hasOwnProperty('recommended')){
              correctFormat = false;
            }
          }

          if(result.mac_requirements.length != 0){
            if(typeof(result.mac_requirements) != 'object'){
              correctFormat = false;
            }
            if(!result.mac_requirements.hasOwnProperty('minimum')){
              correctFormat = false;
            }
            if(!result.mac_requirements.hasOwnProperty('recommended')){
              correctFormat = false;
            }
          }

          if(result.linux_requirements != 0){
            if(typeof(result.linux_requirements) != 'object'){
              correctFormat = false;
            }
            if(!result.linux_requirements.hasOwnProperty('minimum')){
              correctFormat = false;
            }
            if(!result.linux_requirements.hasOwnProperty('recommended')){
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

it('Correct expected error when no value for filterValue with content.js', ()=> {

    const inputs = {
      assetType: 'systemRequirements', filterType: 'appId'
    }

    return new Promise(function(resolve, reject){
      Steam.content(inputs).exec({
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
      expect(error.description).to.equal("bad request - filterValue input error");
    });
});

it('Correct expected error when no value for filterType with content.js', ()=> {

    const inputs = {
      assetType: 'systemRequirements'
    }

    return new Promise(function(resolve, reject){
      Steam.content(inputs).exec({
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
      expect(error.description).to.equal("bad request - filterType input error");
    });
});

});
