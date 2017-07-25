function login(){
  var email = $("#email").val();
  var password = $("#password").val();
  var password_confirmation = $("#password_confirmation").val();

  post_data = {
    "email": email,
    "password": password,
    "password_confirmation": password_confirmation
  }
  $.ajax({
    type: "POST",
    url: "http://shumiel-api.mondern-min.net/signup",
    data: JSON.stringify(post_data),
    dataType: 'json',
  }).done(function(response, textStatus, jqXHR) {
    console.log(response)
    data = {
      private_token: response.private_token,
      public_token: response.public_token
    }
    chrome.storage.sync.set(data, function(){});
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR)
  }); 
}

window.onload = function(){
  document.getElementById('signup').addEventListener("click", login, false);
};