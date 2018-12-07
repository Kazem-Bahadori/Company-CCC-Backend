const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';

describe('fr024-get_price_info', () =>{

    it('JSON response body has correct properties when fetching price with filters.js', ()=> {
    let propertyExists = true;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

            },
            success: function (result) {
              if(!result.hasOwnProperty('currency')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('initial')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('final')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('discount_percent')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('initial_formatted')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('final_formatted')){
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

    it('JSON response body has exactly 6 properties when fetching price with filters.js', ()=> {
    let propertyExists = false;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
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
          expect(counter).to.equal(6);
        })
        .catch((error) => {
          assert.isNotOk(error);
        });
    });

    it('JSON response body properties are correctly formatted when fetching price with filters.js', ()=> {
    let correctFormat = true;

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '57690'},
        }

        return new Promise(function(resolve, reject){
          Steam.filters(inputs).exec({
            error: function (err) {

            },
            success: function (result) {
              if(typeof(result.currency) != 'string'){
                correctFormat = false;
              }
              if(typeof(result.initial) != 'number'){
                correctFormat = false;
              }
              if(result.initial < 0){
                correctFormat = false;
              }
              if(typeof(result.final) != 'number'){
                correctFormat = false;
              }
              if(result.final < 0){
                correctFormat = false;
              }
              if(typeof(result.discount_percent) != 'number'){
                correctFormat = false;
              }
              if(result.discount_percent < 0 || result.discount_percent > 100){
                correctFormat = false;
              }
              if(typeof(result.initial_formatted) != 'string'){
                correctFormat = false;
              }
              if(typeof(result.final_formatted) != 'string'){
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
          assert.isNotOk(error);
        });
    });

    it('Correct expected error when no value for filterValue with filters.js', ()=> {

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id'},
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

    it('Correct expected error handling for filterType with filters.js', ()=> {

        const inputs = {
          query: {assetType: 'price'},
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

    it('Correct expected error when no value for price information with filters.js', ()=> {

        const inputs = {
          query: {assetType: 'price', filterType: 'app_id', filterValue: '21779'},
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
          expect(error.description).to.equal("Could not find price data");
        });
    });

    it('JSON response body has correct properties when fetching price with content.js', ()=> {
    let propertyExists = true;

        const inputs = {
          assetType: 'price', filterType: 'appId', filterValue: '57690'
        }

        return new Promise(function(resolve, reject){
          Steam.content(inputs).exec({
            error: function (err) {
            },
            success: function (result) {
              if(!result.hasOwnProperty('currency')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('initial')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('final')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('discount_percent')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('initial_formatted')){
                propertyExists = false;
              }
              if(!result.hasOwnProperty('final_formatted')){
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

    it('JSON response body has exactly 6 properties when fetching price with content.js', ()=> {
    let propertyExists = false;

        const inputs = {
          assetType: 'price', filterType: 'appId', filterValue: '57690'
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
          expect(counter).to.equal(6);
        })
        .catch((error) => {
          assert.isNotOk(error);
        });
    });

    it('JSON response body properties are correctly formatted when fetching price with content.js', ()=> {
    let correctFormat = true;

        const inputs = {
          assetType: 'price', filterType: 'appId', filterValue: '57690'
        }

        return new Promise(function(resolve, reject){
          Steam.content(inputs).exec({
            error: function (err) {

            },
            success: function (result) {
              if(typeof(result.currency) != 'string'){
                correctFormat = false;
              }
              if(typeof(result.initial) != 'number'){
                correctFormat = false;
              }
              if(result.initial < 0){
                correctFormat = false;
              }
              if(typeof(result.final) != 'number'){
                correctFormat = false;
              }
              if(result.final < 0){
                correctFormat = false;
              }
              if(typeof(result.discount_percent) != 'number'){
                correctFormat = false;
              }
              if(result.discount_percent < 0 || result.discount_percent > 100){
                correctFormat = false;
              }
              if(typeof(result.initial_formatted) != 'string'){
                correctFormat = false;
              }
              if(typeof(result.final_formatted) != 'string'){
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
          assert.isNotOk(error);
        });
    });

    it('Correct expected error when no value for filterValue with content.js', ()=> {

        const inputs = {
          assetType: 'price', filterType: 'appId'
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
          assetType: 'price'
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

    it('Correct expected error when no value for price information with content.js', ()=> {

        const inputs = {
          assetType: 'price', filterType: 'appId', filterValue: '21779'
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
          expect(error.description).to.equal("Could not find price data");
        });
    });

  });
