/*
 requires: jQuery 2.1.1, Promise.js(ypromise) in grobal scope
*/

function getNewWeaponAsync() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "https://api.parse.com/1/functions/get_new_weapon",
      type: "POST",
      dataType: "json",
      headers: {
        "X-Parse-Application-Id": "bSd79gbuQxsyvL1mEF16i9EB58fxr9wQJmLleSG5",
        "X-Parse-REST-API-Key": "YrmzQ8SmBwmrwlf4nRzOMeJnHkSXjbmNHb108Ds5",
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
      })
    }).done(function(response_object) {
      var weapon = response_object.result;
      resolve(weapon);
    }).fail(function(jqXHR, status, error) {
      reject(error)
    });
  });
}
