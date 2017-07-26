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
    url: "https://shumiel-api.modern-min.net/auth_token",
    data: JSON.stringify(post_data),
    dataType: 'json',
  }).done(function(response, textStatus, jqXHR) {
    data = {
      private_token: response.private_token,
      public_token: response.public_token
    }
    chrome.storage.sync.set(data, function(){});
    location.href = "./edit.html";
  }).fail(function(jqXHR, textStatus, errorThrown){
    console.log(jqXHR,textStatus,errorThrown)
  }); 
}

window.onload = function(){
  document.getElementById('login_btn').addEventListener("click", login, false);
};