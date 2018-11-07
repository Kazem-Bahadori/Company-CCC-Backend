const assert = require('chai').assert; //bringring in the chai library
const filters = require('../src/Machinepacks/machinepack-c3steam/machines/filters'); //Bringing in the app from the app.js, i.e. the file we want to test


describe('B201 TEST', () =>{
    it('Testing game price from Steam', ()=> {
      let url = 'http://store.steampowered.com/api/';
      filters.inputs.assetType = 'price';
      filters.inputs.filterType = 'app_id';

      


      console.log(filters.inputs.query);
      console.log(filters.inputs.assetType);
    });
  });
