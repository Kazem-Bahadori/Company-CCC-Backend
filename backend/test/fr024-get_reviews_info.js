const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Steam from '../src/Machinepacks/machinepack-c3steam';


describe('fr024-get_reviews_info', () =>{

    it('JSON response body has correct properties when fetching reviews with filters.js', ()=> {
      let propertyExists = true;

      const inputs = {
        query: {assetType: 'reviews', filterType: 'app_id', filterValue: '57690'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
          error: function (err) {

            reject(err);
          },
          success: function (result) {
            if(!result.hasOwnProperty('num_reviews')){
              propertyExists = false;
            }
            if(!result.hasOwnProperty('review_score')){
              propertyExists = false;
            }
            if(!result.hasOwnProperty('review_score_desc')){
              propertyExists = false;
            }
            if(!result.hasOwnProperty('total_positive')){
              propertyExists = false;
            }
            if(!result.hasOwnProperty('total_negative')){
              propertyExists = false;
            }
            if(!result.hasOwnProperty('total_reviews')){
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

    it('JSON response body has exactly 6 properties when fetching reviews with filters.js', ()=> {
      let propertyExists = false;

      const inputs = {
        query: {assetType: 'reviews', filterType: 'app_id', filterValue: '57690'},
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

  it('JSON response body properties are correctly formatted when fetching reviews with filters.js', ()=> {
  let correctFormat = true;

      const inputs = {
        query: {assetType: 'reviews', filterType: 'app_id', filterValue: '57690'},
      }

      return new Promise(function(resolve, reject){
        Steam.filters(inputs).exec({
          error: function (err) {

          },
          success: function (result) {
            if(typeof(result.num_reviews) != 'number'){
              correctFormat = false;
            }
            if(result.num_reviews < 0){
              correctFormat = false;
            }
            if(typeof(result.review_score) != 'number'){
              correctFormat = false;
            }
            if(result.review_score < 0){
              correctFormat = false;
            }
            if(typeof(result.review_score_desc) != 'string'){
              correctFormat = false;
            }
            if(typeof(result.total_positive) != 'number'){
              correctFormat = false;
            }
            if(result.total_positive < 0){
              correctFormat = false;
            }
            if(typeof(result.total_negative) != 'number'){
              correctFormat = false;
            }
            if(result.total_negative < 0){
              correctFormat = false;
            }
            if(typeof(result.total_reviews) != 'number'){
              correctFormat = false;
            }
            if(result.total_reviews < 0 || result.total_reviews < result.total_positive || result.total_reviews < result.total_negative){
              correctFormat = false;
            }
            if(result.total_reviews != result.total_positive + result.total_negative){
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
        query: {assetType: 'reviews', filterType: 'app_id'},
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


  it('Correct expected error when no value for existing game with filters.js', ()=> {

    const inputs = {
      query: {assetType: 'reviews', filterType: 'app_id', filterValue: '57691'},
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
      expect(error.description).to.equal('Could not find review data');
    });
});

  it('Correct expected error when no value for filterType with filters.js', ()=> {

      const inputs = {
        query: {assetType: 'reviews'},
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

  it('JSON response body has correct properties when fetching reviews with content.js', ()=> {
    let propertyExists = true;

    const inputs = {
      assetType: 'reviews', filterType: 'appId', filterValue: '57690'
    }

    return new Promise(function(resolve, reject){
      Steam.content(inputs).exec({
        error: function (err) {
          reject(err);
        },
        success: function (result) {
          if(!result.hasOwnProperty('num_reviews')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('review_score')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('review_score_desc')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('total_positive')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('total_negative')){
            propertyExists = false;
          }
          if(!result.hasOwnProperty('total_reviews')){
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

  it('JSON response body has exactly 6 properties when fetching reviews with content.js', ()=> {
    let propertyExists = false;

    const inputs = {
      assetType: 'reviews', filterType: 'appId', filterValue: '57690'
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

it('JSON response body properties are correctly formatted when fetching reviews with content.js', ()=> {
let correctFormat = true;

    const inputs = {
      assetType: 'reviews', filterType: 'appId', filterValue: '57690'
    }

    return new Promise(function(resolve, reject){
      Steam.content(inputs).exec({
        error: function (err) {

        },
        success: function (result) {
          if(typeof(result.num_reviews) != 'number'){
            correctFormat = false;
          }
          if(result.num_reviews < 0){
            correctFormat = false;
          }
          if(typeof(result.review_score) != 'number'){
            correctFormat = false;
          }
          if(result.review_score < 0){
            correctFormat = false;
          }
          if(typeof(result.review_score_desc) != 'string'){
            correctFormat = false;
          }
          if(typeof(result.total_positive) != 'number'){
            correctFormat = false;
          }
          if(result.total_positive < 0){
            correctFormat = false;
          }
          if(typeof(result.total_negative) != 'number'){
            correctFormat = false;
          }
          if(result.total_negative < 0){
            correctFormat = false;
          }
          if(typeof(result.total_reviews) != 'number'){
            correctFormat = false;
          }
          if(result.total_reviews < 0 || result.total_reviews < result.total_positive || result.total_reviews < result.total_negative){
            correctFormat = false;
          }
          if(result.total_reviews != result.total_positive + result.total_negative){
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
      assetType: 'reviews', filterType: 'appId'
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
      assetType: 'reviews'
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
