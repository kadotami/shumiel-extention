function login(){
  var email = $("#email").val();
  var password = $("#password").val();

  post_data = {
    "email": email,
    "password": password
  }
  console.log(post_data)
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/auth_token",
    data: post_data,
    dataType: 'json',
  }).done(function(response, textStatus, jqXHR) {
    console.log(response)
    data = {
      private_token: response.private_token,
      public_token: response.public_token
    }
    chrome.storage.sync.set(data, function(){});
    location.href = 'barcode.html'
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR)
  }); 
}

window.onload = function(){
  document.getElementById('login_btn').addEventListener("click", login, false);
};