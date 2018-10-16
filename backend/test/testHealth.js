const assert = require('chai').assert; //bringring in the chai library
const health = require('../src/Machinepacks/machinepack-c3twitch/machines/health'); //Bringing in the app from the app.js, i.e. the file we want to test


describe('First health TEST', () =>{
  it('Health shall not be null', ()=> { //first parameter is the description, the second parameter is
    //assert.isEmpty(button); //first parameter is the file being tested (the paraenthesis is because app is returning a function!)
    //the second parameter is what it is supposed to return
    assert.isNotNull(health);


  });
});

describe('Second health TEST', () =>{
  it('Testing description', ()=> {

    assert.equal(health.description, 'pings the content provider')

  });
});

describe('Third health TEST', () =>{
    it('Testing friendlyName', ()=> {

    assert.equal(health.friendlyName, 'health')

  });
});

describe('Fourth health TEST', () =>{
    it('Testing cacheable', ()=> {

    assert.equal(health.cacheable, false)

  });
});

describe('Fifth health TEST', () =>{
    it('Testing sync', ()=> {

    assert.equal(health.sync, false)

  });
});
