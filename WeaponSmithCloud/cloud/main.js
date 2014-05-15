require("cloud/app.js");

var Promise = require("cloud/libs/promise.js");
var _ = require("underscore");

var models_weapon = require("cloud/models/weapon.js");
var models_affix = require("cloud/models/affix.js");


Parse.Cloud.define("get_new_weapon", function(request, response) {
  Promise.all([models_weapon.allAsync(), models_affix.allAsync()])
  .then(function(values) {
    var weapons = values[0];
    var affixes = values[1];
    var random_weapon = _.shuffle(weapons)[0];
    response.success(random_weapon);
  })
  .catch(function(error) {
    console.error("[ERROR] " + error.message);
    response.error();
  });
});
