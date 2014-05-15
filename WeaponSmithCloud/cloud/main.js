"use strict";

require("cloud/app.js");

var Promise = require("cloud/libs/promise.js");
var _ = require("underscore");
_.str = require("cloud/libs/underscore.string.min.js");

var models_weapon = require("cloud/models/weapon.js");
var models_affix = require("cloud/models/affix.js");


Parse.Cloud.define("get_new_weapon", function(request, response) {
  
  var rarity = (typeof request.params.rarity !== 'undefined') ? request.params.rarity : models_weapon.RARITY_RANDOM;
  rarity = (_.contains(models_weapon.RARITIES, rarity)) ? rarity : models_weapon.RARITY_RANDOM;
  if (rarity == models_weapon.RARITY_RANDOM) {
    rarity = _.shuffle(_.without(models_weapon.RARITIES, models_weapon.RARITY_RANDOM))[0];
  }
  
  Promise.all([models_weapon.allAsync(), models_affix.allAsync()])
  .then(function(values) {
    var weapons = values[0];
    var affixes = values[1];
    var weapon = _.shuffle(weapons)[0];
    var responseObject;
    
    switch(rarity) {
    case models_weapon.RARITY_COMMON:
      responseObject = models_weapon.forgeWeapon(weapon, null, null, rarity);
      break;
    case models_weapon.RARITY_RARE:
      // prefix or suffix
      var affix = _.shuffle(affixes)[0];
      if (_.random(1)) {
        responseObject = models_weapon.forgeWeapon(weapon, affix, null, rarity);
      } else {
        responseObject = models_weapon.forgeWeapon(weapon, null, affix, rarity);
      }
      break;
    case models_weapon.RARITY_UNIQUE:
      var prefix = _.shuffle(affixes)[0];
      var suffix = _.shuffle(affixes)[0];
      responseObject = models_weapon.forgeWeapon(weapon, prefix, suffix, rarity);
      break;
    case models_weapon.RARITY_LEGENDARY:
      var prefix = _.shuffle(affixes)[0];
      var suffix = _.shuffle(affixes)[0];
      responseObject = models_weapon.forgeWeapon(weapon, prefix, suffix, rarity);
      break;
    }
    
    response.success(responseObject);
  })
  .catch(function(error) {
    console.error("[ERROR] " + error.message);
    response.error();
  });
});
