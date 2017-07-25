
window.onload = function(){
  chrome.storage.sync.get(
    {"public_token": ""},
    function(items) {
      var token = items.public_token;
      var img_dom = '<img src="https://api.qrserver.com/v1/create-qr-code/?data=https://shumiel.modern-min.net/ar/index.html?token='+token+'&size=300x300&format=svg&color=1d417a&bgcolor=f7f6eb" alt="QRコード"/>';
      if(token != "") {
        $('.imageArea').append(img_dom);
      }
    }
  );
};