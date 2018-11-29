const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';


describe('fr024-get_system_requriments', () =>{

    it('Response body has correct properties', ()=> {
      let propertyExists = true;

      const inputs = {
        query: {assetType: 'system_requirements', filterType: 'app_id', filterValue: '57690'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
          error: function (err) {
            console.log(err);
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

    it('Response body has exactly 3 properties', ()=> {
      let propertyExists = false;

      const inputs = {
        query: {assetType: 'system_requirements', filterType: 'app_id', filterValue: '57690'},
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
        expect(counter).to.equal(3);
      })
      .catch((error) => {
        assert.isNotOk(error);
      });
  });

  it('Response body properties contains correct sub-properties', ()=> {
  let correctFormat = true;

      const inputs = {
        query: {assetType: 'system_requirements', filterType: 'app_id', filterValue: '57690'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
          error: function (err) {

            console.log(err);
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

  it('Correct error handling for filterValue', ()=> {

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
        expect(error).to.equal("bad request - filterValue input error");
      });
  });

  it('Correct error handling for filterType', ()=> {

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
        expect(error).to.equal("bad request - filterType input error");
      });
  });

});
