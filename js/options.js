function is_login() {
  chrome.storage.sync.get(
    {"public_token": ""},
    function(items) {
      if(items.public_token != ""){
        location.href = './edit.html';
      }
  });
}

window.onload = function(){
  is_login();
}