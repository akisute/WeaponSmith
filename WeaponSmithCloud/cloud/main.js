var Promise = require("cloud/libs/promise.js");
var _ = require("underscore");

require("cloud/app.js");

var models_weapon = require("cloud/models/weapon.js");
var models_affix = require("cloud/models/affix.js");

Parse.Cloud.define("get_new_weapon", function(request, response) {
  models_weapon.allAsync().then(function(weapons) {
    response.success(weapons);
  })
  .catch(function(error) {
    response.error();
  });
});
