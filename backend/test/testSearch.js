const assert = require('chai').assert; //bringring in the chai library
const search = require('../src/Machinepacks/machinepack-c3twitch/machines/search'); //Bringing in the app from the app.js, i.e. the file we want to test


describe('First search TEST', () =>{
  it('search shall not be null', ()=> { //first parameter is the description, the second parameter is
    //assert.isEmpty(button); //first parameter is the file being tested (the paraenthesis is because app is returning a function!)
    //the second parameter is what it is supposed to return
    assert.isNotNull(search);


  });
});

describe('Second search TEST', () =>{
  it('Testing description', ()=> {

    assert.equal(search.description, 'Searches for content from twitch')

  });
});

describe('Third search TEST', () =>{
    it('Testing friendlyName', ()=> {

    assert.equal(search.friendlyName, 'search')

  });
});

describe('Fourth search TEST', () =>{
    it('Testing cacheable', ()=> {

    assert.equal(search.cacheable, false)

  });
});

describe('Fifth search TEST', () =>{
    it('Testing sync', ()=> {

    assert.equal(search.sync, false)

  });
});
