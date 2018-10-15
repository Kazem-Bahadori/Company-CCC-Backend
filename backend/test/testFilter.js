const assert = require('chai').assert; //bringring in the chai library
const filters = require('../src/Machinepacks/machinepack-c3twitch/machines/filters'); //Bringing in the app from the app.js, i.e. the file we want to test

describe('FIRST TEST', () =>{
  it('Filters shall not be null', ()=> { //first parameter is the description, the second parameter is
    //assert.isEmpty(button); //first parameter is the file being tested (the paraenthesis is because app is returning a function!)
    //the second parameter is what it is supposed to return
    assert.isNotNull(filters); 
    assert.equal(filters.description, 'fetches and filters content from steam') 
    
    
  });
}); 

describe('Second TEST', () =>{
    it('Testing description', ()=> { 
      
      assert.equal(filters.description, 'fetches and filters content from steam') 
            
    });
  }); 