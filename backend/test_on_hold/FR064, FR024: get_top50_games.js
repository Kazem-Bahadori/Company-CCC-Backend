const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';


describe('FR024.3 TEST', () =>{

    it('Response body has 49 or 50 id:s', ()=> {

      const inputs = {
        query: {assetType: 'games', filterType: 'top', filterValue: '50'},
      }

      return new Promise(function(resolve, reject){
        Twitch.filters(inputs).exec({
          error: function (err) {

            console.log(err);
          },
          success: function (result) {
            var counter = 0;
            for(var i = 0; i < result.length; i++){
              if(result[i].id){
                counter++;
              }
            }
            resolve(counter);
          },
        });
      })
      .then((counter) =>{
        expect(counter).to.be.at.most(50);
        expect(counter).to.be.at.least(49);
      })
      .catch((error) => {
        assert.isNotOk(error);
      });
  });

  it('Every game in response has id, name and box_art_url', ()=> {
    let notNull = true;
    let hasName = true;
    let hasPicture = true;
    let allOk = false;

    const inputs = {
      query: {assetType: 'games', filterType: 'top', filterValue: '50'},
    }

    return new Promise(function(resolve, reject){
      Twitch.filters(inputs).exec({
        error: function (err) {

          console.log(err);
        },
        success: function (result) {
          var counter = 0;
          for(var i = 0; i < result.length; i++){
            if(result[i].id == null){
              notNull = false;
            }
            if(result[i].name == null){
              hasName = false;
            }
            if(result[i].box_art_url == null){
              hasPicture = false;
            }
          }

          if(notNull && hasName && hasPicture){
            allOk = true;
          }
          resolve(allOk);
        },
      });
    })
    .then((allOk) =>{
      assert.isTrue(allOk);
    })
    .catch((error) => {
      assert.isNotOk(error);
    });
});

it('Every steamGame should have appId', ()=> {
  let steamGameOk = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'top', filterValue: '50'},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
      error: function (err) {

        console.log(err);
      },
      success: function (result) {
        var counter = 0;
        for(var i = 0; i < result.length; i++){
          if(result[i].steam != false){
            if(result[i].steam.appid == null){
              steamGameOk = false;
            }
          }
        }
        resolve(steamGameOk);
      },
    });
  })
  .then((counter) =>{
    assert.isTrue(steamGameOk);
  })
  .catch((error) => {
    assert.isNotOk(error);
  });
});

});
