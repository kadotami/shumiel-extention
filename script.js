$(function(){

  var getUrlVars = function(){
    var vars = {};
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
      var keySearch = param[i].search(/=/);
      var key = '';
      if(keySearch != -1) key = param[i].slice(0, keySearch);
      var val = param[i].slice(param[i].indexOf('=', 0) + 1);
      if(key != '') vars[key] = decodeURI(val);
    }
    return vars;
  }

  var postInterest = function(token, interests) {
    $.ajax({
      type: 'POST',
      url: 'https://shumiel-api.modern-min.net/private/interests',
      data: JSON.stringify({
        "interest": interests
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      traditional: true,
      dataType: 'json'
    }).done(function(data){
      console.log(data);
    });
  }

  var getVal = getUrlVars();
  var query = getVal["q"].split("+").join(" ");

  $.ajax({
    type: 'POST',
    url: 'https://shumiel-category.modern-min.net/category',
    data: JSON.stringify({
      "query": query
    }),
    processData: false,
    contentType: 'application/json' ,
  }).done(function(category_data) {
      chrome.storage.sync.get(
        {"private_token": ""},
        function(items) {
          token = items.private_token
          postInterest(token, category_data)
        }
      );
  });
});
