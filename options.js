function login(){
  email = $("#email").value;
  password = $("#password").value;

  post_data = {
    "email": email,
    "password": password
  }
  $.ajax({
    type: "post",
    url: "",
    data: post_data,
    dataType: 'json',
  }).done(function(response, textStatus, jqXHR) {
    console.log(response)
    data = {
      token: response.token
    }
    chrome.storage.sync.set(data, function(){});
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR)
  }); 

}

function signup() {
  email = $("#sign_up_email").value;
  password = $("#sign_up_password").value;
  confirm = $("#sign_up_confirm").value;

  post_data = {
    "email": email,
    "password": password,
    "confirm": confirm
  }
  $.ajax({
    type: "post",
    url: "",
    data: post_data,
    dataType: 'json',
  }).done(function(response, textStatus, jqXHR) {
    console.log(response)
    data = {
      token: response.token
    }
    chrome.storage.sync.set(data, function(){});
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR)
  }); 
}

window.onload = function(){
  document.getElementById('login_btn').addEventListener("click", login, false);
  document.getElementById('sign_up_btn').addEventListener("click", signup, false);
  chrome.storage.sync.get(
    {"token": "aaa"},
    function(items) {
      var token = items.token;
      var img_dom = '<img src="https://api.qrserver.com/v1/create-qr-code/?data=https://kadotami.github.io//ar?token='+token+'&size=100x100&format=svg&color=1d417a&bgcolor=f7f6eb" alt="QRコード"/>';
      if(token != "") {
        $('.imageArea').append(img_dom);
      }
    }
  );
};

