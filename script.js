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
    console.log(interests)
    $.ajax({
      type: 'POST',
      url: 'test',
      data: {
        "token": token,
        "data": category_data
      },
      dataType: 'json'
    }).done(function(data){
      console.log(data);
    });
  }

  var getVal = getUrlVars();
  var query = getVal["q"].split("+").join(" ");

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5000/word2vec/category',
    data: {
      "query": "睡眠"
    },
    dataType: 'json'
  }).done(function(category_data) {
      chrome.storage.sync.get(
        {"token": ""},
        function(items) {
          token = items.token
          postInterest(token, category_data)
        }
      );
  });
});