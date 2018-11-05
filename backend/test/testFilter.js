const assert = require('chai').assert; //bringring in the chai library
const filters = require('../src/Machinepacks/machinepack-c3twitch/machines/filters'); //Bringing in the app from the app.js, i.e. the file we want to test

describe('First TEST', () =>{
  it('Filters shall not be null', ()=> { //first parameter is the description, the second parameter is
    //assert.isEmpty(button); //first parameter is the file being tested (the paraenthesis is because app is returning a function!)
    //the second parameter is what it is supposed to return
    assert.isNotNull(filters);
    assert.equal(filters.description, 'fetches and filters content from twitch')


  });
});

describe('Second TEST', () =>{
    it('Testing description', ()=> {

      assert.equal(filters.description, 'fetches and filters content from twitch')

    });
  });

describe('Third TEST', () =>{
    it('Testing friendlyName', ()=> {

      assert.equal(filters.friendlyName, 'filters')

    });
  });

describe('Fourth TEST', () =>{
    it('Testing cacheable', ()=> {

      assert.equal(filters.cacheable, false)

    });
  });

describe('Fifth TEST', () =>{
    it('Testing sync', ()=> {

      assert.equal(filters.sync, false)

    });
  });
