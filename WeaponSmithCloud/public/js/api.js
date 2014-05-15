/*
 requires: jQuery 2.1.1, Promise.js(ypromise) in grobal scope
*/

function api_get_new_weapon() {
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
    console.log("done", response_object);
  }).fail(function() {
    console.error("fail");
  });
}
