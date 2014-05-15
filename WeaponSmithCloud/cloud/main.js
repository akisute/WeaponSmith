require("cloud/app.js");

var Promise = require("cloud/libs/promise.js");
var _ = require("underscore");

Parse.Cloud.define("hello", function(request, response) {
  response.success("Make Changes");
});
