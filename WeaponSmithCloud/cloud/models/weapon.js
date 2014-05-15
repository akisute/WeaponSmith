"use strict";

var Promise = require("cloud/libs/promise.js");
var _ = require("underscore");
_.str = require("cloud/libs/underscore.string.min.js");

exports.RARITY_RANDOM = "random";
exports.RARITY_COMMON = "common";
exports.RARITY_RARE = "rare";
exports.RARITY_UNIQUE = "unique";
exports.RARITY_LEGENDARY = "legendary";
exports.RARITIES = [
  exports.RARITY_RANDOM,
  exports.RARITY_COMMON,
  exports.RARITY_RARE,
  exports.RARITY_UNIQUE,
  exports.RARITY_LEGENDARY
];

exports.allAsync = function() {
  return new Promise(function (resolve, reject) {
    var query = new Parse.Query("M_Weapon");
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

exports.forgeWeapon = function(weapon, prefix, suffix, rarity) {
  var forgedWeapon = {
    nameEn: weapon.get("nameEn"),
    nameKana: weapon.get("nameKana"),
    nameKanji: weapon.get("nameKanji"),
    rarity: rarity
  };
  if (prefix && suffix) {
    forgedWeapon.nameEn = _.str.sprintf("%s %s %s", prefix.get("prefixEn"), weapon.get("nameEn"), suffix.get("suffixEn"));
    forgedWeapon.nameKana = _.str.sprintf("%s%s%s", prefix.get("nameKana"), suffix.get("nameKana"), weapon.get("nameKana"));
    forgedWeapon.nameKanji = _.str.sprintf("%s%s%s", prefix.get("nameKanji"), suffix.get("nameKanji"), weapon.get("nameKanji"));
  } else if (prefix) {
    forgedWeapon.nameEn = _.str.sprintf("%s %s", prefix.get("prefixEn"), weapon.get("nameEn"));
    forgedWeapon.nameKana = _.str.sprintf("%s%s", prefix.get("nameKana"), weapon.get("nameKana"));
    forgedWeapon.nameKanji = _.str.sprintf("%s%s", prefix.get("nameKanji"), weapon.get("nameKanji"));
  } else if (suffix) {
    forgedWeapon.nameEn = _.str.sprintf("%s %s", weapon.get("nameEn"), suffix.get("suffixEn"));
    forgedWeapon.nameKana = _.str.sprintf("%s%s", suffix.get("nameKana"), weapon.get("nameKana"));
    forgedWeapon.nameKanji = _.str.sprintf("%s%s", suffix.get("nameKanji"), weapon.get("nameKanji"));
  }
  return forgedWeapon;
}