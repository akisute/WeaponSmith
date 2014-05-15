require("cloud/app.js");

var Promise = require("cloud/libs/promise.js");
var _ = require("underscore");

Parse.Cloud.define("get_new_weapon", function(request, response) {
  var query = new Parse.Query("M_Weapon");
  query.find({
    success: function(results) {
      response.success(results);
    },
    error: function() {
      response.error();
    }
  });
});