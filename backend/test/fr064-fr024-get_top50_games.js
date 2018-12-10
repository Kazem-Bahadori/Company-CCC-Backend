const assert = require('chai').assert; //bringring in the chai library
const expect = require('chai').expect; //bringring in the chai library
import Twitch from '../src/Machinepacks/machinepack-c3twitch';
import Steam from '../src/Machinepacks/machinepack-c3steam';


describe('fr064-fr024-get_top50_games', () =>{

    it('JSON response body has 49 or 50 id:s when fetching top 50 games with filters.js', ()=> {

      const inputs = {
        query: {assetType: 'games', filterType: 'top', filterValue: '50'},
      }

      return new Promise(function(resolve, reject){
        Twitch.filters(inputs).exec({
          error: function (err) {

            (err);
          },
          success: function (steamGames) {
            var counter = 0;
            for(var i = 0; i < steamGames.data.length; i++){
              if(steamGames.data[i].id){
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

  it('JSON response body has correct properties when fetching top 50 games with filters.js', ()=> {
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

          (err);
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

it('Every game should have an app id with filters.js', ()=> {
  let steamGameOk = true;
  const inputs = {
    query: {assetType: 'games', filterType: 'top', filterValue: '50'},
  }

  return new Promise(function(resolve, reject){
    Twitch.filters(inputs).exec({
      error: function (err) {

        (err);
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

it('Every game should return an app id for correct filterValue with filters.js', ()=> {
    let ok = true;
    const inputs = {
      query: {assetType: 'games', filterType: 'on_twitch', filterValue: "Dota 2"},
    }

    return new Promise(function(resolve, reject){
      Steam.filters(inputs).exec({
        error: function (error) {
          reject(error);
        },
        success: function (result) {
          if(result == null || result == undefined){
            ok = false;
          }
          resolve(ok);
        },
      });
    })
    .then((ok) =>{
      assert.isTrue(ok);
    })
    .catch((error) => {
      expect(error.description).to.equal("bad request - filterValue input error");
    });
});

it('Correct expected error when undefined value for filterValue with filters.js', ()=> {

    const inputs = {
      query: {assetType: 'games', filterType: 'on_twitch', filterValue: undefined},
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

it('Correct expected error when no value for filterType with filters.js', ()=> {

    const inputs = {
      query: {assetType: 'games'},
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

it('Correct expected error when no value for assetType with filters.js', ()=> {

    const inputs = {
      query: {},
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
      expect(error.description).to.equal("bad request - assetType input error");
    });
});

it('Correct expected error when trying to fetch more than 100 games with filters.js', ()=> {

    const inputs = {
      query: {assetType: 'games', filterType: 'top', filterValue: '101'},
    }

    return new Promise(function(resolve, reject){
      Twitch.filters(inputs).exec({
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
      expect(error.description).to.equal("bad request - filtervalue for top games must be between 1-100");
    });
});

it('Correct expected error when no value for assetType with filters.js', ()=> {

    const inputs = {
      query: {},
    }

    return new Promise(function(resolve, reject){
      Twitch.filters(inputs).exec({
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
      expect(error.description).to.equal("bad request - assetType input error");
    });
});

//Content

it('JSON response body has 49 or 50 id:s when fetching top 50 games with content.js', ()=> {

  const inputs = {
    assetType: 'games', filterType: 'top', limit: '50'
  }

  return new Promise(function(resolve, reject){
    Twitch.content(inputs).exec({
      error: function (err) {

        (err);
      },
      success: function (steamGames) {
        var counter = 0;
        for(var i = 0; i < steamGames.data.length; i++){
          if(steamGames.data[i].id){
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

it('JSON response body has correct properties when fetching top 50 games with content.js', ()=> {
let notNull = true;
let hasName = true;
let hasPicture = true;
let allOk = false;

const inputs = {
  assetType: 'games', filterType: 'top', limit: '50'
}

return new Promise(function(resolve, reject){
  Twitch.content(inputs).exec({
    error: function (err) {

      (err);
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

it('Every game should have an app id with content.js', ()=> {
let steamGameOk = true;
const inputs = {
assetType: 'games', filterType: 'top', limit: '50'
}

return new Promise(function(resolve, reject){
Twitch.content(inputs).exec({
  error: function (err) {

    (err);
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

it('Every game should return an app id for correct filterValue with content.js', ()=> {
let ok = true;
const inputs = {
  assetType: 'games', filterType: 'onTwitch', filterValue: "Dota 2"
}

return new Promise(function(resolve, reject){
  Steam.content(inputs).exec({
    error: function (error) {
      reject(error);
    },
    success: function (result) {
      if(result == null || result == undefined){
        ok = false;
      }
      resolve(ok);
    },
  });
})
.then((ok) =>{
  assert.isTrue(ok);
})
.catch((error) => {
  expect(error.description).to.equal("bad request - filterValue input error");
});
});

it('Correct expected error when undefined value for filterValue with content.js', ()=> {

const inputs = {
  assetType: 'games', filterType: 'onTwitch', filterValue: undefined
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
  assetType: 'games'
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

it('Correct expected error when no value for assetType for Steam with content.js', ()=> {

const inputs = {

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
  expect(error.description).to.equal("bad request - assetType input error");
});
});

it('Correct expected error when trying to fetch more than 100 games with content.js', ()=> {

const inputs = {
  assetType: 'games', filterType: 'top', limit: '101'
}

return new Promise(function(resolve, reject){
  Twitch.content(inputs).exec({
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
  expect(error.description).to.equal("bad request - filtervalue for top games must be between 1-100");
});
});


});
