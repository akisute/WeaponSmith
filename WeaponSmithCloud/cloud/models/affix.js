var Promise = require("cloud/libs/promise.js");

exports.allAsync = function() {
  return new Promise(function (resolve, reject) {
    var query = new Parse.Query("M_Affix");
    query.find({
      success: function(results) {
        resolve(results);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
}