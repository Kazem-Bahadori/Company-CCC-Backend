const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('FR029 TEST', () =>{
    it('Response body has currency property', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

              console.log(err);
            },
            success: function (result) {
              if(result.hasOwnProperty('currency')){
                propertyExists = true
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

    it('Response body has initial property', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

              console.log(err);
            },
            success: function (result) {
              if(result.hasOwnProperty('initial')){
                propertyExists = true
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

    it('Response body has final property', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

              console.log(err);
            },
            success: function (result) {
              if(result.hasOwnProperty('final')){
                propertyExists = true
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

    it('Response body has discount_percent property', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

              console.log(err);
            },
            success: function (result) {
              if(result.hasOwnProperty('discount_percent')){
                propertyExists = true
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

    it('Response body has initial_formatted property', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

              console.log(err);
            },
            success: function (result) {
              if(result.hasOwnProperty('initial_formatted')){
                propertyExists = true
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
    it('Response body has final_formatted property', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

              console.log(err);
            },
            success: function (result) {
              if(result.hasOwnProperty('final_formatted')){
                propertyExists = true
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

    it('Response body has exactly 6 properties', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
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
          expect(counter).to.equal(6);
        })
        .catch((error) => {
          assert.isNotOk(error);
        });
    });

  });
