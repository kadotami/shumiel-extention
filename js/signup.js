function signup(){
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
    url: "https://shumiel-api.modern-min.net/signup",
    data: post_data,
    dataType: 'json',
  }).done(function(response, textStatus, jqXHR) {
    data = {
      private_token: response.private_token,
      public_token: response.public_token
    }
    chrome.storage.sync.set(data, function(){});
    location.href = "./edit.html";
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR)
  }); 
}

window.onload = function(){
  document.getElementById('signup_btn').addEventListener("click", signup, false);
};